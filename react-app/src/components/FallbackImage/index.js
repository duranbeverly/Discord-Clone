import React, { useState } from "react";
import "./FallbackImage.css";

// Discord's default avatar colors
const COLORS = ["#5865f2", "#3ba55c", "#faa61a", "#ed4245", "#eb459e", "#747f8d"];

const hash = (str) => {
    let h = 0;
    for (const ch of String(str || "")) h = (h * 31 + ch.charCodeAt(0)) | 0;
    return Math.abs(h);
};

export const initials = (name, max = 2) => {
    const words = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return "?";
    return words.slice(0, max).map((w) => w[0]).join("").toUpperCase();
};

export const colorFor = (name) => COLORS[hash(name) % COLORS.length];

// Renders the image, and if it is missing or fails to load, a Discord-style placeholder
// with the same className so it keeps the same size and shape.
//   kind="user"   -> colored circle with the user's initials
//   kind="server" -> server initials (what Discord shows for servers without an icon)
//   kind="banner" -> gradient color block with the name's initials
export default function FallbackImage({ src, name, kind = "user", className = "", style, alt = "", ...rest }) {
    const [failedSrc, setFailedSrc] = useState(null);

    if (src && failedSrc !== src) {
        return <img src={src} alt={alt} className={className} style={style} onError={() => setFailedSrc(src)} {...rest} />;
    }

    const color = colorFor(name);
    const background = kind === "banner"
        ? `linear-gradient(135deg, ${color}, ${COLORS[(hash(name) + 2) % COLORS.length]})`
        : color;

    return (
        <div
            role="img"
            aria-label={alt || name}
            className={`${className} img-fallback img-fallback-${kind}`}
            style={{ ...style, background }}
            {...rest}
        >
            {initials(name, kind === "user" ? 2 : 3)}
        </div>
    );
}
