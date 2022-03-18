import React from 'react';

interface Props {

}

export default function Category(props: Props) {
  return (
    <div className="course-category">
      <div className="title">全部课程</div>
      <ul className="options">
        <li className="active">全部</li>
        <li>IT·互联网</li>
        <li>设计·创作</li>
        <li>电商·营销</li>
        <li>职业·考证</li>
        <li>升学·考研</li>
        <li>兴趣·生活</li>
        <li>语言·留学</li>
      </ul>
    </div>
  );
}