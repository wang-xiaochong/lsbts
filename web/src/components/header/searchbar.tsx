import React, { useState, useEffect } from "react";

import { connect, RootState, Dispatch, actions, AppState, SiteState } from "@/store/index";

interface Props {
    site: SiteState;
    app?: AppState
    dispatch: Dispatch
}
function Searchbar(props: Props) {
    const [showList, setShowList] = useState(false)
    const hotKeywords = props?.site?.hotKeywords;
    const suggest = props?.site?.suggest;
    const [kw, setKw] = useState('')
    const searchBarKw = props.app?.searchBarKw
    if (!hotKeywords) props.dispatch(actions.site.getHotKeywords());

    // console.log(hotKeyWords)
    useEffect(() => {
        props.dispatch(actions.site.getSuggest(kw));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kw]);

    useEffect(() => {
        setKw(searchBarKw || '')
    }, [searchBarKw])


    //
    const keyWords = suggest || hotKeywords;

    const updateKw = () => {
        props.dispatch(actions.app.setSearchBarKw(kw));
    };

    return (
        <div className="searchbar">
            <div className="search">
                <i className="type">课程</i>
                <input
                    className="keyword" type="text" placeholder="搜索课程"
                    value={kw}
                    onFocus={ev => setShowList(true)}
                    // onBlur={ev => setShowList(false)}
                    onInput={ev => setKw((ev.target as HTMLInputElement).value)}
                    onKeyDown={ev => {
                        if (ev.key === 'Enter') updateKw()
                    }}
                />
                <div className="btn" onClick={() => updateKw()}>
                    <i className="icon icon-search-w" />
                </div>
            </div>

            {showList && keyWords && keyWords.length > 0 ? (<div className="list">
                {suggest ? '' : (<div className="title">热门搜索</div>)}
                <ul>
                    {keyWords.map((kw, index) => {
                        return <li key={index} onClick={() => { setKw(kw as string); updateKw() }
                        }>{kw}</li>
                    }
                    )}
                </ul>
            </div>) : ''}


        </div>
    )
}

export default connect((state: RootState) => {
    return state
})(Searchbar);