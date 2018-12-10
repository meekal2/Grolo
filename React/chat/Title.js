import React from "react";
import LoggedIn from "../Redux/LoggedIn";
class Title extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <LoggedIn>
          <div className="chat-name p-2 bg-white">
            <div className="media">
              <span className="chat-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-none d-block d-sm-block d-md-none" />
              <img
                src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
                width="37"
                className="rounded-circle mr-1"
                alt="avatar"
              />
              <div className="media-body">
                <span className="float-left">
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                  <p className="success font-small-2 m-0">Online / Offline</p>
                </span>
                <i className="ft-more-vertical float-right mt-1" />
              </div>
            </div>
          </div>
        </LoggedIn>
      </div>
    );
  }
}

export default Title;
