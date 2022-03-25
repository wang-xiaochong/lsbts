import { duration2string, ts2string } from '@/libs/common';
import React from 'react';

interface Props {
  chapters: {
    ID: number;
    title: string;
    progress: number;
    sections: {
      ID: number;
      title: string;
      time?: number;
      progress?: number;
      type: 'live' | 'video' | 'read' | 'download'
    }[]
  }[]

}

export default function Chapters(props: Props) {
  const { chapters } = props
  return (
    <div className="chapters">
      {chapters.map(chapter => (
        <div key={chapter.ID} className="chapter">
          <div className="chapter-title">
            <div className="progress">{chapter.progress}</div>
            <div className="title">{chapter.title}</div>
          </div>
          <div className="tasks">
            {chapter.sections.map(section => (
              <div key={section.ID} className="task">
                <div className="progress">{section.progress}</div>
                <div className="content">
                  <div className="title">{section.title}</div>
                  {section.time ? (
                    <div className="duration">{(() => {
                      switch (section.type) {
                        case 'live':
                          return ts2string(section.time * 1000, 'yyyy-MM-dd')
                        case 'video':
                          return duration2string(section.time)
                        default:
                          return ''
                      }
                    })()}</div>
                  ) : ''}
                </div>
                {(() => {
                  switch (section.type) {
                    case 'live':
                      return (
                        <div className="operation">
                          <span className="btn">进入直播间</span>
                        </div>)
                    case 'video':
                      return (
                        <div className="operation">
                          <span className="btn">看录播</span>
                        </div>)
                    case 'read':
                      return (
                        <div className="operation">
                          <span className="btn">开始阅读</span>
                        </div>
                      )
                    case 'download': return (
                      <div className="operation">
                        <span className="btn">下载</span>
                      </div>
                    )
                    default: return '';
                  }
                })()}

              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}