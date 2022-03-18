import { FilterOptions } from '@/views/List';
import React from 'react';

interface Props {
  data: FilterOptions,
  onChange: (data: FilterOptions) => void
}

export default function Filter(props: Props) {
  const { data, onChange } = props;
  const { type, options, sort } = data;
  const types: { title: string, value: undefined | 'free' | 'cost' }[] = [
    { title: '全部', value: undefined },
    { title: '免费课', value: 'free' },
    { title: '付费课', value: 'cost' }
  ];

  const Option = (props: {
    title: string;
    option: 'video' | 'live' | 'playback' | 'auth' | 'living';
  }) => {
    const { title, option } = props;
    return (
      <label>
        <input type="checkbox" checked={options.indexOf(option) !== -1}
          onChange={() => {
            let newOptions = [];
            if (options.indexOf(option) === -1) {
              newOptions = [...options, option]
            } else {
              newOptions = options.filter(item => item !== option)
            }
            onChange({ ...data, options: newOptions });
          }}
        />{title}
      </label>
    )
  }
  const sorts: {
    title: string,
    value: 'default' | 'rank' | 'students' | 'price',
    hasIcon: boolean,
  }[] = [
      { title: '综合排序', value: 'default', hasIcon: false },
      { title: '好评率', value: 'rank', hasIcon: true },
      { title: '人气', value: 'students', hasIcon: true },
      { title: '价格', value: 'price', hasIcon: true },
    ];
  return (
    <div className="course-filter">
      <div className="filter">

        <div className="group radio">
          {types.map((item, index) => (
            <span
              key={index}
              className={`btn ${item.value === type ? 'active' : ''}`}
              onClick={() => {
                onChange({ ...data, type: item.value })
              }}
            >{item.title}</span>
          ))}
        </div>

        <div className="split">|</div>
        <div className="group check">
          <Option title='录播' option='video' />
          <Option title='直播' option='live' />
          <Option title='有回放' option='playback' />
        </div>
        <div className="split">|</div>
        <div className="group check">
          <Option title='认证课程' option='auth' />
        </div>
        <div className="split">|</div>
        <div className="group check">
          <Option title='正在直播' option='living' />
        </div>
      </div>


      <div className="order">
        {sorts.map((item, index) => {
          return (
            <div
              key={index}
              className={`btn ${item.value === sort ? 'active' : ''}`}
              onClick={() => {
                onChange({
                  ...data, sort: item.value
                })
              }}
            >{item.title}
              {item.hasIcon ? (<i className="icon icon-arrowdown" />) : ''}
            </div>
          )
        })}
      </div>
    </div>
  );
}