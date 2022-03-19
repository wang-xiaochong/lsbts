import React, { useState, useEffect } from "react";

import { appData } from "models/app";
import { getHotKeyWords, SearchResult, getSuggest } from "models/search";
import { connect, RootState, Dispatch, actions, AppState } from "@/store/index";

interface Props {
    app: AppState
    dispatch: Dispatch
}
function Searchbar(props: Props) {

    const [hotKeyWords, setHotKeyWords] = useState<SearchResult | undefined>(appData?.hotKeyWords)
    const [showList, setShowList] = useState(false)
    const [suggest, setSuggest] = useState<SearchResult | undefined>()
    const [kw, setKw] = useState('')
    const searchBarKw = props.app.searchBarKw
    useEffect(() => {
        if (!hotKeyWords) {
            getHotKeyWords().then(arr => {
                setHotKeyWords(arr);    //?????
            })
        }
    }, [hotKeyWords])
    // console.log(hotKeyWords)
    useEffect(() => {
        if (!kw) { setSuggest(undefined) }
        else {
            getSuggest(kw).then(data => {
                setSuggest(data) //?????
            })
        }
    }, [kw])
    useEffect(() => {
        setKw(searchBarKw || '')
    }, [searchBarKw])

    const keyWords = suggest || hotKeyWords
    const updateKw = () => {
        props.dispatch(actions.app.setSearchBarKw(kw))
    }

    return (
        <div className="searchbar">
            <div className="search">
                <i className="type">课程</i>
                <input
                    className="keyword" type="text" placeholder="搜索课程"
                    value={kw}
                    onFocus={ev => setShowList(true)}
                    onBlur={ev => setShowList(false)}
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
                    {keyWords.map((kw, index) => (
                        <li key={index}>{kw}</li>
                    ))}
                </ul>
            </div>) : ''}


        </div>
    )
}

export default connect((state: RootState) => {
    return state
})(Searchbar);