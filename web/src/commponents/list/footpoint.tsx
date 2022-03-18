import React from 'react';

interface Props {
  items?: {
    title: string;
    href: string;
  }[]
}

export default function Footpoint(props: Props) {
  const { items } = props;

  return (
    <div className="footpoint">
      <a href="/list/">全部课程</a>
      <span>
        <i className="icon icon-right" />
      </span>

      {items ? items.map((item, index) => (
        <React.Fragment key={index}>
          <a href={item.href}>{item.title}</a>
          <span>
            <i className="icon icon-right" />
          </span>
        </React.Fragment>
      )) : ''
      }
    </div >
  );
}