import * as React from "react";



const SeatIcon: React.FC<{ type: "selected" | "disable" | "default"|"waiting" }> = ({ type }) => {
    const fill = type === "default" ? "#FFF" : type === "disable" ? "rgb(224, 224, 224)" : type === "selected" ?  "rgb(139, 229, 176)":"#ffb155";
    const stroke = type === "default" ? "#B8B8B8" : type === "disable" ? "rgb(242, 242, 242)" : type === "selected" ?  "rgb(39, 174, 96)":"#f79d33";
    return (
        <svg
        width={40}
        height={32}
        viewBox="0 0 40 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x={8.75}
            y={2.75}
            width={22.5}
            height={26.5}
            rx={2.25}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <rect
            x={10.25}
            y={11.75}
            width={14.5}
            height={5.5}
            rx={2.25}
            transform="rotate(90 10.25 11.75)"
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <rect
            x={35.25}
            y={11.75}
            width={14.5}
            height={5.5}
            rx={2.25}
            transform="rotate(90 35.25 11.75)"
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <rect
            x={8.75}
            y={22.75}
            width={22.5}
            height={6.5}
            rx={2.25}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <path
            className="icon-selected"
            d="M20 6.333A6.67 6.67 0 0 0 13.334 13 6.67 6.67 0 0 0 20 19.667 6.67 6.67 0 0 0 26.667 13 6.669 6.669 0 0 0 20 6.333zm-1.333 10L15.333 13l.94-.94 2.394 2.387 5.06-5.06.94.946-6 6z"
            fill={type === "selected" ? "rgb(39, 174, 96)" : "transparent"}
        />
        <path
            className="icon-disabled"
            d="M24.96 9.46l-1.42-1.42L20 11.59l-3.54-3.55-1.42 1.42L18.59 13l-3.55 3.54 1.42 1.42L20 14.41l3.54 3.55 1.42-1.42L21.41 13l3.55-3.54z"
            fill={type === "disable" ? "rgb(242, 242, 242)" : "transparent"}
        />
    </svg>
    )
};
export default SeatIcon;