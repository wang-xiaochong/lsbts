import { duration2string, ts2string } from '@/libs/common';
import { CourseChapterData, LiveData, VideoData } from 'models/course';
import React, { useState } from 'react';
import Progress from '../progress';
import * as routers from '../../router';
interface Props {
  chapters: CourseChapterData[];

}

export default function Chapters(props: Props) {
  const { chapters } = props
  const [collapse, setCollapse] = useState<{
    [key: string]: boolean;
  }>({})

  return (
    <div className="chapters">
      {chapters.map(chapter => (
        <div key={chapter.ID} className="chapter">

          <div className="chapter-title" onClick={() => {
            let { ID } = chapter
            let newCollapse = {
              ...collapse,
              [ID]: !collapse[ID]
            }
            setCollapse(newCollapse)
          }}>
            <div className="progress">{<Progress value={chapter.progress} />}</div>
            <div className="title">{chapter.title}</div>
          </div>

          <div className="tasks" style={{ height: collapse[chapter.ID] ? 0 : `${94 * chapter.sections.length}px`, }}>
            {chapter.sections.map(section => (
              <div key={section.ID} className="task">
                <div className="progress">{section.type === 'video' ? <Progress value={section.progress} /> : ''}</div>
                <div className="content">
                  <div className="title">{section.title}</div>

                  <div className="duration">{(() => {
                    switch (section.type) {
                      case 'live':
                        return ts2string((section.item as LiveData).start_time * 1000, 'yyyy-MM-dd')
                      case 'video':
                        return duration2string((section.item as VideoData).duration)
                      default:
                        return ''
                    }
                  })()}</div>

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
                          <a href={routers.video(section.ID)} className="btn">看录播</a>
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