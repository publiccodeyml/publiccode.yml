#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# The master toctree document.
master_doc = 'index'

# Monkey patch to fix recommonmark 0.4 doc reference issues.
# See https://github.com/rtfd/recommonmark/issues/93#issuecomment-441798805
from recommonmark.states import DummyStateMachine
orig_run_role = DummyStateMachine.run_role
def run_role(self, name, options=None, content=None):
    if name == 'doc':
        name = 'any'
    return orig_run_role(self, name, options, content)
DummyStateMachine.run_role = run_role
