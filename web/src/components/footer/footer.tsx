import React from 'react';
import { connect, Dispatch, SiteState, actions, RootState } from '@/store/index'


interface Props {
  site?: SiteState,
  dispatch: Dispatch
}

function Footer(props: Props) {
  const links = props.site?.links;
  if (!links) {
    props.dispatch(actions.site.getSiteLink())
  }
  return (
    <div className="g-footer">
      <div className="page">
        <div className="links">
          {/* <h2>合作链接</h2>
          {
            links ?
              (<div className="link-list">
                {links.map(link => (
                  <a href={link.href} target='_blank' rel="noreferrer" key={link.ID}>{link.title}</a>
                ))}
              </div>) : ''
          } */}
        </div>
        {/* <div className="copyright" /> */}
      </div>
    </div>
  );
}

export default connect((state: RootState) => {
  return state
})(Footer)