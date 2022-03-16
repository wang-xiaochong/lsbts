import React from 'react';

interface Props {

}

export default function HotTopic(props: Props) {
  return (
    <div className="ad-bottom">
      <h4 className="cap">热门知识</h4>
      <ul className="tabs page">
        <li className="tab-item active">IT·互联网</li>
        <li className="tab-item">设计·创作</li>
        <li className="tab-item">电商·营销</li>
        <li className="tab-item">职业·考证</li>
        <li className="tab-item">升学·考研</li>
        <li className="tab-item">兴趣·生活</li>
      </ul>
      <div className="content page">
        <a href="/search?kw=xxx">mpacc培训</a>
      </div>
    </div>
  );
}