import React, { Component } from "react";
import available_languages from "../contents/langs";
//const available_languages = ["ita", "eng", "fra", "zho"];

export default class languageSwitcher extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { languages, currentLanguage, search } = this.props;
    //console.log(error);
    let results = available_languages;
    if (search)
      results = available_languages.filter(name => name.indexOf(search) > -1);

    return (
      <div className="language-switcher">
        {languages.map(lng => {
          let cn = "language-switcher__item";
          if (lng == currentLanguage) {
            cn += " language-switcher__item--selected";
          }
          return (
            <div key={lng} className={cn}>
              <a onClick={() => this.props.switchLang(lng)}>{lng}</a>
              <span
                className="glyphicon glyphicon-remove"
                onClick={() => this.props.removeLang(lng)}
              />
            </div>
          );
        })}
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle language-switcher__link"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            + Add Language
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="form-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="search..."
                onChange={e => this.props.onSearch(e.target.value)}
              />
            </div>
            <div className="scroll">
              {results.map(lng => (
                <a
                  key={lng}
                  className="dropdown-item"
                  onClick={() => this.props.switchLang(lng)}
                >
                  {lng}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
