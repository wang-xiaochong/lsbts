import React from "react";

interface Props {
    value: number;
}

export default function Progress(props: Props) {
    const { value } = props;
    return (
        <>
            {value}
        </>
    )
}