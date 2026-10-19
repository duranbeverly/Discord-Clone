import React from "react"
import "../ServerUserList/ServerUserLIst.css"
import "../FallbackImage/FallbackImage.css"

export default function DeveloperList() {
    return (
        <div id="conversations-container" className="server-user-list" style={{ marginBottom: "0px" }}>
            <span>Developers</span>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <div className="dev-avatar dev-mel" aria-hidden="true">MC</div>
                    <p className="dm-username">
                        Melinda Cortez
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/in/melinda-cortez-3581b0139/"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/Solita43"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <div className="dev-avatar dev-bev" aria-hidden="true">BD</div>
                    <p className="dm-username">
                        Beverly Duran
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/beverly-duran/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/duranbeverly"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <div className="dev-avatar dev-jay" aria-hidden="true">JL</div>
                    <p className="dm-username">
                        Jay Levin
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/jay-levin/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/jaylevin96"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <div className="dev-avatar dev-ben" aria-hidden="true">BW</div>
                    <p className="dm-username">
                        Benjamin Wilson
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/benjamin-wilson-2a39ab271/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/BenjaminWilson13"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </span>
                    </p>

                </div>
            </div>
        </div>
    )
}
