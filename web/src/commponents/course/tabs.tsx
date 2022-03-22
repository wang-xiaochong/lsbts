import React, { ReactChild } from "react";

interface Props {
    items: (string | ReactChild)[];
    cur: number;
    onchange: (value: number) => void

}
export default function tabs(props: Props) {

    const { items, cur, onchange } = props;



    return (
        <div className="tabs">
            {items.map((item, index) => (
                <div
                    className={`tab ${index === cur ? 'active' : ''}`}
                    onClick={() => onchange(index)}
                >{item}</div>
            ))}

        </div>
    )
}