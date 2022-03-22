import React from "react";

interface Props {

}
export default function courseCommont(props:Props) {
    return (
        <div className="course-item course-comment">
            <div className="comment-filter">
                <label>
                    <input type="radio" defaultChecked />
                    全部评价(2)
                </label>
                <label>
                    <input type="radio" />
                    好评(1)
                </label>
                <label>
                    <input type="radio" />
                    中评(1)
                </label>
                <label>
                    <input type="radio" />
                    差评(0)
                </label>
            </div>
            <ul className="comment-list">
                <li>
                    <div className="user">
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="nickname">M****</div>
                    </div>
                    <div className="comment">
                        <div className="rank">
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-grey" />
                        </div>
                        <div className="content">
                            前面五节课讲得不错,第六节课时长100多分钟还期待了下,结果有七八十分钟都在做广告,这就体验很差了
                        </div>
                        <div className="info">
                            <span>已上课2小时32分钟时评价</span>
                            <span className="time">2020-09-03</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="user">
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="nickname">M****</div>
                    </div>
                    <div className="comment">
                        <div className="rank">
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-grey" />
                        </div>
                        <div className="content">
                            前面五节课讲得不错,第六节课时长100多分钟还期待了下,结果有七八十分钟都在做广告,这就体验很差了
                        </div>
                        <div className="info">
                            <span>已上课2小时32分钟时评价</span>
                            <span className="time">2020-09-03</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="user">
                        <div className="avatar">
                            <img src="/image/tmp_avatar.jpg" alt="" />
                        </div>
                        <div className="nickname">M****</div>
                    </div>
                    <div className="comment">
                        <div className="rank">
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-yellow" />
                            <i className="icon icon-star-grey" />
                        </div>
                        <div className="content">
                            前面五节课讲得不错,第六节课时长100多分钟还期待了下,结果有七八十分钟都在做广告,这就体验很差了
                        </div>
                        <div className="info">
                            <span>已上课2小时32分钟时评价</span>
                            <span className="time">2020-09-03</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}