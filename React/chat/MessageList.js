import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const MessageList = chat => {
  const date = moment(chat.message.dateCreated).format("LT");
  return (
    <React.Fragment>
      <div className="chats" id="messageList">
        {chat.message.fromUserId === chat.user.id ? (
          <div className="chat">
            <div className="chat-avatar">
              <a
                className="avatar"
                data-toggle="tooltip"
                href="#"
                data-placement="left"
                title=""
                data-original-title=""
              >
                <img
                  src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
                  className="width-50 rounded-circle"
                  alt="avatar"
                />
              </a>
            </div>
            <div className="chat-body" key={chat.message.id}>
              <div className="chat-content">
                <p style={{ fontSize: "16px" }}>
                  <span style={{ fontSize: "12px" }}>
                    {" "}
                    <strong>{chat.message.fromUser}</strong>
                  </span>{" "}
                  <br />
                  {chat.message.message}
                </p>
              </div>
            </div>
            <div>{date}</div>
          </div>
        ) : (
          <div className="chat chat-left" id="messageList">
            <div className="chat-avatar">
              <a
                className="avatar"
                data-toggle="tooltip"
                href="#"
                data-placement="right"
                title=""
                data-original-title=""
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6XDaVThj2_rJwBBne8IBqiyQBkunYkg6S1UAa8XmxGz4C-uxCQ"
                  className="width-50 rounded-circle"
                  alt="avatar"
                />
              </a>
            </div>
            <div className="chat-body" key={chat.message.id}>
              <div className="chat-content">
                <p>
                  <span style={{ fontSize: "16px" }}> {chat.message.fromUser}</span> <br />
                  {chat.message.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(MessageList);
