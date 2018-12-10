import React from "react";
import { connect } from "react-redux";
import { getAllBusChatMessages } from "../../services/chatMessage.service";
import LoggedIn from "../Redux/LoggedIn";
import "./Chat.css";
import GroupChatList from "./GroupChatList";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import Title from "./Title";
import InfiniteScroll from "../../shared/InfiniteScroll";
const $ = window.jQuery;

class ChatContainer extends React.Component {
  state = {
    messages: [],
    id: 0,
    busId: 0,
    message: "",
    userList: [],
    busList: [],
    pageIndex: 0,
    pageSize: 24,
    totalPages: 0,
    alreadyScrolled: false
  };
  messagesEnd = React.createRef();

  componentDidMount = () => {
    this.fetchData();
    var agencyRepHubProxy = $.connection.agencyRepHub;
    agencyRepHubProxy.client.newMessage = (messages, id, firstName, lastName) => {
      const theMessage = messages;
      const fullName = firstName + " " + lastName;
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          { message: theMessage, fromUserId: id, fromUser: fullName }
        ]
      }));
    };
    agencyRepHubProxy.client.updateUserList = userList => {
      this.setState({ userList });
    };
    agencyRepHubProxy.client.getBusList = busList => {
      this.setState({ busList });
    };
    $.connection.hub.start().done(function() {});
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  sendMessage = e => {
    e.preventDefault();
    $.connection.agencyRepHub.server.messageReceived(this.state.message, 5);
    this.setState({ message: "" });
  };
  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  // componentDidUpdate = (prevProps, prevState) => {
  //   const { messages } = this.state;
  //   const { messages: prevMessages } = prevState;
  //   if (messages.length === prevMessages.length) {
  //     setTimeout(this.scrollToBottom, 0);
  //   }
  // };
  // getBusId = () => {
  //   this.setState({ busId });
  // };

  fetchData = () => {
    const busId = 5;
    const { pageIndex, pageSize } = this.state;
    if (this.state.pageIndex === 0 || this.state.pageIndex < this.state.totalPages) {
      getAllBusChatMessages(pageIndex, pageSize, busId).then(response => {
        if (response.data.item) {
          const result = response.data.item.pageItems;
          this.setState(prevState => {
            return {
              messages: result.concat(prevState.messages),
              totalPages: response.data.item.totalPages,
              pageIndex: prevState.pageIndex + 1
            };
          });
          if (this.state.alreadyScrolled === false) {
            this.scrollToBottom();
            this.setState({ alreadyScrolled: true });
          }
        } else {
        }
      });
    }
  };
  // fetchMoreData = () => {
  //   const busId = 5;
  //   const { pageIndex, pageSize } = this.state;
  //   getAllChatMessages(pageIndex, pageSize, busId).then(response => {
  //     const result = response.data.item.pageItems;
  //     this.setState(prevState => ({
  //       messages: [...result, ...prevState.messages]
  //     }));
  //   });
  // };
  render() {
    const { messages } = this.state;
    const myMessages = [].concat(messages).sort((a, b) => {
      if (a.dateCreated > b.dateCreated) {
        return 1;
      } else if (a.dateCreated < b.dateCreated) {
        return -1;
      }
      return 0;
    });
    const { user } = this.props;
    // const filtered = messages
    //   .sort(({ dateCreated: a }, { dateCreated: b }) => a - b)
    //   .filter((s => ({ fromUser }) => !s.has(fromUser) && s.add(fromUser))(new Set()));
    const { busList } = this.state;
    return (
      <React.Fragment>
        <LoggedIn>
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="chat-application mt-2">
                <div className="content-overlay" />
                <div className="chat-sidebar float-right d-none d-sm-none d-md-block d-lg-block ps-container ps-theme-default ps-active-y ">
                  <div className="chat-sidebar-content">
                    {busList ? (
                      <>
                        {busList.map(chatList => (
                          <GroupChatList chatList={chatList} />
                        ))}
                      </>
                    ) : (
                      <div>{null}</div>
                    )}
                  </div>
                </div>
                <Title user={user} userList={this.state.userList} />
                <section className="chat-app-window">
                  <InfiniteScroll
                    onVisible={() => {
                      this.fetchData();
                    }}
                  />
                  {myMessages ? (
                    <>
                      {myMessages.map(myMessages => (
                        <MessageList message={myMessages} user={user} />
                      ))}
                      <div ref={this.messagesEnd} />
                    </>
                  ) : (
                    <div>{null}</div>
                  )}
                </section>
                <MessageForm
                  sendMessage={e => this.sendMessage(e)}
                  onChange={e => this.onChange(e)}
                  message={this.state.message}
                />
              </div>
            </div>
          </div>
        </LoggedIn>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(ChatContainer);
