import React, { Component } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import { notify } from "../store/notifications";

import img_x from "../../asset/img/x.svg";
import img_copy from "../../asset/img/copy.svg";
import img_upload from "../../asset/img/upload.svg";
import img_download from "../../asset/img/download.svg";
import img_dots from "../../asset/img/dots.svg";

import { getLabel } from "../contents/data";

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    notify: data => dispatch(notify(data))
  };
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class sidebar extends Component {
  constructor(props) {
    super(props);
  }

  load(files) {
    const { onLoad, onReset } = this.props;
    //has dom
    console.log("LOAD", files);
    if (!files || !files[0]) {
      this.props.notify({ type: 1, msg: "File not found" });
      return;
    }
    let ext = files[0].name.split(".")[1];

    if (ext != "yml") {
      this.props.notify({ type: 1, msg: "File type not supported" });
      return;
    }

    const reader = new FileReader();
    const that = this;

    onReset();
    reader.onload = function() {
      let yaml = reader.result;
      onLoad(yaml);
      document.getElementById("load_yaml").value = "";
    };
    reader.readAsText(files[0]);
  }

  download(data) {
    //has dom
    const blob = new Blob([data], {
      type: "text/yaml;charset=utf-8;"
    });
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = blobURL;
    tempLink.setAttribute("download", "pubbliccode.yml");
    tempLink.click();
  }

  render() {
    let { yaml, error, loading, values, allFields } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__title">
          File YAML {loading && <img src={img_dots} className="loading" />}
        </div>

        {error && (
          <div className="sidebar__error">
            {Object.keys(error).map((e, i) => (
              <div key={i}>
                <img src={img_x} />
                {getLabel(allFields, e)}
              </div>
            ))}
          </div>
        )}
        <div className="sidebar__code">
          <pre>
            <code>{yaml}</code>
          </pre>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer_item">
            <a href="#">
              <img src={img_copy} alt="copy" />
              <span
                className="action"
                onClick={() => {
                  copy(yaml);
                  this.props.notify({
                    type: "info",
                    title: "",
                    msg: "Copied to clipboard"
                  });
                }}
              >
                Copy
              </span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <input
              id="load_yaml"
              type="file"
              style={{ display: "none" }}
              onChange={e => this.load(e.target.files)}
            />

            <a href="#">
              {false && <span className="glyphicon glyphicon-open-file" />}
              <img src={img_upload} alt="upload" />
              <span
                className="action"
                onClick={() => document.getElementById("load_yaml").click()}
              >
                Upload
              </span>
            </a>
          </div>
          <div className="sidebar__footer_item">
            <a href="#">
              {false && <span className="glyphicon glyphicon-save-file" />}
              <img src={img_download} alt="dowload" />
              <span className="action" onClick={() => this.download(yaml)}>
                Download
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
