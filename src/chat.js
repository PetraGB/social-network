import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { socket } from "./socket";
// import { receiveChat } from "./actions";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        !this.props.chatMessages && socket.emit("receiveChat");
    }

    handleInput(e) {
        if (e.which === 13) {
            e.preventDefault();
            var chatMessage = e.target.value;
            socket.emit("newChatMessage", chatMessage);
            e.target.value = "";
        }
    }

    render() {
        console.log(this.props);
        if (this.chatDiv) {
            // console.log(this.chatDiv);
            this.chatDiv.scrollTop = this.chatDiv.scrollHeight;
            // console.log(this.chatDiv.scrollTop);
            // console.log(this.chatDiv.scrollHeight);
            // console.log(this.chatDiv.clientHeight);
        }
        return (
            <div className="chatPage">
                <div className="onlineUsers">
                    {this.props.onlineUsers &&
                        this.props.onlineUsers.map(onUser => {
                            return (
                                <div className="onlineUser" key={onUser.id}>
                                    <Link
                                        to={"/user/" + onUser.id}
                                        className="onlineUserPic"
                                    >
                                        <img src={onUser.picture} />
                                    </Link>
                                    <h4>
                                        {onUser.first_name} {onUser.last_name}
                                    </h4>
                                </div>
                            );
                        })}
                </div>
                <div className="chat">
                    <div
                        className="chatContainer"
                        ref={chatContainer => (this.chatDiv = chatContainer)}
                    >
                        {this.props.chatMessages &&
                            this.props.chatMessages.map(chatMessage => {
                                return (
                                    <div
                                        className="chatMessage"
                                        key={chatMessage.chatid}
                                    >
                                        <p>{chatMessage.message}</p>
                                        <div className="messageUser">
                                            <p className="datePost">
                                                {chatMessage.posted}
                                            </p>
                                            <h4>
                                                {chatMessage.first_name}{" "}
                                                {chatMessage.last_name}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <textarea onKeyDown={this.handleInput} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { onlineUsers: state.onlineUsers, chatMessages: state.chatMessages };
}

export default connect(mapStateToProps)(Chat);
