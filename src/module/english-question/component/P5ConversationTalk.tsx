import React from "react";

function P5ConversationTalk({ text, number, asterisk }: any) {
  return (
    <label className=" d-flex flex-row">
      <span className="fs-12 color-dark d-flex flex-row">
        {text}
        <div className="round-numbered-text">{number}</div>{" "}
        {asterisk && <span className="asterisk">&#42;</span>}
      </span>
    </label>
  );
}

export default P5ConversationTalk;
