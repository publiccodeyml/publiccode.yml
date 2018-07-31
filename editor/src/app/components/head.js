import React, { Component } from "react";
import { repositoryUrl } from "../contents/constants";
const head = () => {
  return (
    <div className="content__head">
      <div className="content__head__title">Public Code</div>
      <div className="content__head__help">
        <a href={repositoryUrl} target="_blank">
          Need help?
        </a>
      </div>
    </div>
  );
};

export default head;
