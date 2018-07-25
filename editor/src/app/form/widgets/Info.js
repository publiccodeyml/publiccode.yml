import React from "react";

const ReadMore = props => {
  if (!props.description) return null;
  let partial = ellipsis(props.description);
  return <small className="form-text text-muted">{partial}</small>;
};

const ellipsis = descr => {
  let partial = descr;
  if (descr.length > MAX_LEN) {
    partial = descr.substring(0, 55) + "...";
  }
  return partial;
};

const MAX_LEN = 50;

const Info = props => {
  if (!props.description) return null;
  let { description } = props;
  let partial = ellipsis(description);
  return (
    <div className="field_info">
      <small className="form-text text-muted">
        <span>{partial}</span>
        {description.length > MAX_LEN && (
          <span>
            <a
              href="#"
              className="link"
              onClick={() => alert(props.description)}
            >
              Read more
            </a>
          </span>
        )}
      </small>
    </div>
  );
};

export default Info;
