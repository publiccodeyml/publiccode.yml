import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { DefaultTheme as Widgets } from "../form";
import { APP_FORM } from "../contents/constants";
const data = [
  {
    title: "block 1",
    index: 1,
    items: [
      {
        title: "info",
        label: "Informazioni",
        descr: "informazioni varie",
        type: "string",
        widget: "editor"
      },
      {
        title: "softwareVersion",
        label: "Software Version",
        description: "This key contains...",
        type: "string",
        widget: "textarea"
      }
    ]
  },
  {
    title: "block 2",
    index: 2,
    items: [
      {
        title: "firstName",
        label: "First Name",
        descr: "",
        type: "string"
      },
      {
        title: "lastName",
        label: "Last Name",
        descr: "",
        type: "string"
      },
      {
        title: "email",
        label: "Email",
        descr: "",
        type: "string",
        required: true
      }
    ]
  }
];

const getField = obj => {
  let name = obj.widget ? obj.widget : obj.type;
  console.log("Field", name);
  return React.createElement(Widgets[name], {
    key: obj.title,
    fieldName: obj.title,
    label: obj.label,
    schema: obj,
    required: obj.required
  });
};

const renderBlockItems = (items, id) => {
  return items.map((item, i) => {
    getField(item);
    return (
      <div className="block__item" key={`block_${id}_item_${i}`}>
        <div className="form-group">
          {getField(item)}

          {/*
              <label>{item.label}</label>
              <Field
            className="form-control"
            name={item.name}
            component={item.widget}
            type={item.type}
            placeholder={item.label}
          />*/}
        </div>
      </div>
    );
  });
};

const renderBlocks = blocks => {
  return blocks.map((block, i) => (
    <div className="block__wrapper" key={`block_${i}`}>
      <div className="block_heading">
        <div className="block_heading_oval">{block.index}</div>
        <div className="block_heading_title">{block.title}</div>
      </div>
      <div className="block">{renderBlockItems(block.items, i)}</div>
    </div>
  ));
};

const StupidForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      {renderBlocks(data)}
      <hr />
      <div className="block__wrapper">
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const _StupidForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="block__wrapper">
        <div className="block_heading">
          <div className="block_heading_oval">1</div>
          <div className="block_heading_title">Informazioni Generali</div>
        </div>

        <div className="block">
          <div className="block__item">
            <div className="form-group">
              <label>First Name</label>
              <Field
                className="form-control"
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="block__item">
            <div className="form-group">
              <label>Last Name</label>

              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="block__item">
            <div className="form-group">
              <label>Email</label>
              <div>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block__wrapper">
        <div className="block_heading">
          <div className="block_heading_oval">2</div>
          <div className="block_heading_title">Informazioni Addizionali</div>
        </div>

        <div className="block">
          <div className="block__item">
            <div className="form-group">
              <label>Sex</label>
              <div>
                <label>
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="male"
                  />{" "}
                  Male
                </label>
                <label>
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="female"
                  />{" "}
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="block__item">
            <div className="form-group">
              <label>Favorite Color</label>

              <Field name="favoriteColor" component="select">
                <option />
                <option value="ff0000">Red</option>
                <option value="00ff00">Green</option>
                <option value="0000ff">Blue</option>
              </Field>
            </div>
          </div>

          <div className="block__item">
            <div className="form-group">
              <label htmlFor="employed">Employed</label>

              <Field
                name="employed"
                id="employed"
                component="input"
                type="checkbox"
              />
            </div>
          </div>

          <div className="block__item">
            <div className="form-group">
              <label>Notes</label>

              <Field name="notes" component="textarea" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="block__wrapper">
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
   form: 'remoteSubmit', // a unique identifier for this form
  onSubmit: submit,
})(APP_FORM);
