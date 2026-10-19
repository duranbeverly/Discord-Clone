import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getConversationMessagesThunk } from "../../store/userConversationMessages";
import { getConversationsThunk } from "../../store/userconversations";
import OpenModalButton from "../OpenModalButton";
import "./directMessages.css";
import MessageDetails from "../MessageDetails";
import UpdateMessageModal from "../UpdateMessageModal";
import { socket } from "../../socket"

export default function ConversationMessages() {
    let dispatch = useDispatch();
    const params = useParams();
    let { conversationId } = params;
    let conversations = useSelector((state) => state.userConversationMessages);
    let conversationList = useSelector((state) => state.userConversations);
    let currentUser = useSelector((state) => state.session.user);
    let conversation = conversations[conversationId];
    let [isLoading, setIsLoading] = useState(true);
    let [messages, setMessages] = useState([]);
    let [chatInput, setChatInput] = useState("");
    let [errors, setErrors] = useState({});



    let username;
    for (let key in conversationList) {
        if (
            conversationList[key] &&
            conversationList[key].conversation_id === parseInt(conversationId)
        ) {
            username = conversationList[key].username;
        }
    }

    useEffect(() => {
        dispatch(getConversationMessagesThunk(conversationId)).then(() =>
            setIsLoading(false)
        );
    }, [conversationId, dispatch]);

    useEffect(() => {
        if (conversation && Object.keys(conversation).length)
            setMessages(conversation.messages.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                }
                return 1
            }));
    }, [conversations, conversation]);

    // open socket with useEffect
    useEffect(() => {


        const onNewMessage = (direct_message) => {
            // updating store
            dispatch(getConversationMessagesThunk(direct_message.conversationId));
            dispatch(getConversationsThunk());
        };
        const refresh = (direct_message) => {
            dispatch(getConversationMessagesThunk(direct_message.conversationId));
        };
        socket.on("direct_message", onNewMessage);
        socket.on("delete_direct_message", refresh);
        socket.on("update_direct_message", refresh);

        // when component unmounts, remove the listeners so they don't pile up
        return () => {
            socket.off("direct_message", onNewMessage);
            socket.off("delete_direct_message", refresh);
            socket.off("update_direct_message", refresh);
        };
    }, [dispatch]);

    if (isLoading) return <div id="direct-messages-view"></div>;
    // send chat messages through web socket
    const sendChat = (e) => {
        e.preventDefault();

        if (chatInput.length > 255 || chatInput.length < 1) {
            setErrors({ chat: "Message must be between 1 and 255 characters" });
            return;
        } else {
            setErrors("");
            socket.emit("direct_message", {
                message: chatInput,
                conversation_id: conversationId,
                user_id: currentUser.userId,
            });
            setChatInput("");

        }
    };
    const handleEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            setErrors({})
            sendChat(e);
        }
    };

    const deleteChat = (messageId) => {
        socket.emit("delete_direct_message", {
            messageId,
        });

    };
    if (isLoading || !conversation) {
        return <div id="direct-messages-view"></div>;
    }

    return (
        <div className="socket-container">
            {errors.chat && <p className="errors">{errors.chat}</p>}
            <form className="channel-message-input-form" onSubmit={sendChat}>
                <textarea
                    className="message-input"
                    placeholder={`Message @${username}`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleEnter}
                >
                    {" "}
                </textarea>
            </form>

            <div id="messages-scroll">
                <div>
                    {!messages.length && <h4>No messages yet...</h4>}
                    <div className="test">
                        {messages.map((message) => {
                            return (
                                <div
                                    key={message.id}
                                    className="group-messages-buttons"
                                    onMouseOver={() => {
                                        const buttonbox = document.getElementById(message.id);
                                        if (buttonbox) buttonbox.className = "message-update-buttons";
                                    }}
                                    onMouseLeave={() => {
                                        const buttonbox = document.getElementById(message.id);
                                        if (buttonbox) buttonbox.className = "hidden";
                                    }}
                                >
                                    <MessageDetails key={message.id} message={message} />
                                    {message.userId === currentUser.userId && (
                                        <div id={message.id} className="hidden">
                                            <button
                                                className="delete-message-button"
                                                onClick={() => deleteChat(message.id)}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                            <OpenModalButton
                                                buttonText={<i className="fa-solid fa-gear"></i>}
                                                // onItemClick={closeMenu}
                                                className="update-conversation"
                                                modalComponent={
                                                    <UpdateMessageModal message={message} />
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* <div>
                {messages.map((message) => {
                    let showEmojiList = emojiList[message.id]
                    return (<div key={message.id}>
                        <div>
                            {message.UserInfo.username}
                            <img className="dm-profile-img" src={message.UserInfo.userIcon}></img>

                        </div>
                        <p>{message.createdAt}</p>
                        <div>
                            {message.message}
                            <button
                                onClick={() => buttonClick(message.id)}
                            >😊</button>
                            {showEmojiList && (
                                <ul>
                                    <li>😊</li>
                                    <li>❤️ </li>
                                    <li>👍🏻</li>
                                    <li>👀</li>
                                </ul>
                            )}

                            <DirectMessageReactions reactions={message.reactions} />
                            <div>
                                {Object.values(message.reactions).length > 0 && Object.values(message.reactions).length}
                            </div>
                        </div>
                    </div>)
                })}

            </div> */}
            </div>
        </div>
    );
}
