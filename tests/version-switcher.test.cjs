const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const template = fs.readFileSync(path.join(__dirname, '../_templates/page.html'), 'utf8');
const script = template.match(/<script>([\s\S]*?)<\/script>/)[1];

function setup(select = null) {
  const listeners = {};
  const requests = [];
  const destinations = [];
  const context = vm.createContext({
    document: { getElementById(id) {
      assert.equal(id, 'version-select');
      return select;
    } },
    window: {
      addEventListener(name, listener) { listeners[name] = listener; },
      location: {
        hash: '#example',
        set href(value) { destinations.push(value); }
      }
    },
    fetch(url, options) {
      assert.equal(options.method, 'HEAD');
      return new Promise((resolve, reject) => {
        requests.push({ url, resolve, reject });
      });
    }
  });
  vm.runInContext(script, context);
  return {
    pageshow(persisted) { listeners.pageshow({ persisted }); },
    requests,
    destinations,
    select(value) { context.switchVersion({ value, dataset: { page: 'schema.html' } }); }
  };
}

// Drain both the response handler and its rejection handler without timers.
async function settle(request, outcome) {
  if (outcome === 'error') request.reject(new Error('Network error'));
  else request.resolve({ ok: outcome === 'ok' });
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

for (const outcome of ['ok', 'missing', 'error']) {
  for (const order of [[0, 1], [1, 0]]) {
    test(`ignore stale ${outcome}, completion order ${order}`, async () => {
      const harness = setup();
      harness.select('../v0/');
      harness.select('../v1/');
      assert.equal(harness.requests[0].url, '../v0/schema.html');
      assert.equal(harness.requests[1].url, '../v1/schema.html');
      for (const index of order) {
        await settle(harness.requests[index], index === 0 ? outcome : 'ok');
        assert.deepEqual(harness.destinations,
          index === 0 && order[0] === 0 ? [] : ['../v1/schema.html#example']);
      }
    });
  }
  test(`latest selection handles ${outcome}`, async () => {
    const harness = setup();
    harness.select('../v0/');
    harness.select('../v1/');
    await settle(harness.requests[1], outcome);
    await settle(harness.requests[0], 'ok');
    assert.deepEqual(harness.destinations,
      [outcome === 'ok' ? '../v1/schema.html#example' : '../v1/']);
  });
}

for (const persisted of [false, true]) {
  for (const current of [0, 1]) {
    test(`restore version ${current} on pageshow, persisted=${persisted}`, () => {
      const select = {
        options: [0, 1].map(index => ({ defaultSelected: index === current })),
        selectedIndex: 1 - current
      };
      const harness = setup(select);
      harness.pageshow(persisted);
      assert.equal(select.selectedIndex, current);
      select.selectedIndex = 1 - current;
      harness.pageshow(persisted);
      assert.equal(select.selectedIndex, current);
      assert.deepEqual(harness.destinations, []);
      assert.deepEqual(harness.requests, []);
    });
  }
}

test('pageshow tolerates a missing selector', () => {
  setup().pageshow(false);
});

test('disable history form value restoration on the selector', () => {
  assert.match(template, /<select\b[^>]*id="version-select"[^>]*autocomplete="off"/);
});
