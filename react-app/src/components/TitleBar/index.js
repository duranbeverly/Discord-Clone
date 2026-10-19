import React, { useEffect, useState } from "react";
import FallbackImage from "../FallbackImage";
import "./TitleBar.css"
import DropDownButton from "../DropDownButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MobileMenuButton, MobileMembersButton } from "../../context/MobileNav";

function TitleBar({ title, users }) {
    const { serverId, conversationId } = useParams();
    const conversationUsers = useSelector(state => state.userConversations)
    const userStatuses = useSelector((state) => state.onlineStatus.UserStatus)
    const conversation = Object.values(conversationUsers).filter(convo => {
        return convo.conversation_id === +conversationId
    })[0]
    let userId
    if (conversation) {
        userId = conversation.userId
    }
    let status = userStatuses[userId]
    let online = false;
    if (status === "online") {
        online = true
    }

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)

        return () => setIsLoading(true)
    }, [])



    if (isLoading) return (<div className="top-bar"><div id="channel-top-title"></div></div>)

    let header = conversation ? conversation.username : title;

    return (
        <div className="top-bar">
            <MobileMenuButton />
            <DropDownButton serverId={serverId} title={title} users={users} />
            <div id="channel-top-title">
                {conversation ? (<FallbackImage alt="" className="title-profile-img" src={conversation.userIcon} name={conversation.username}
                    style={online ? { border: "2px solid green" } : {}}

                />) : <i className="fa-solid fa-hashtag title-icon"></i>}
                <h1 className="top-title">{header}</h1>
            </div>
            <MobileMembersButton />
        </div>
    )
}

export default TitleBar;
