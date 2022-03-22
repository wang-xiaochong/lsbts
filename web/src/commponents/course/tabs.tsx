import React from "react";

interface Props {

}
export default function tabs(props:Props) {
    return (
        <div className="tabs">
            <div className="tab active">课程概述</div>
            <div className="tab">目录</div>
            <div className="tab">评论(2)</div>
        </div>
    )
}