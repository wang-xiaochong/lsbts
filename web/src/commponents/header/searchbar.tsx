import React, { useState, useEffect } from "react";

import { appData } from "models/app";
import { getHotKeyWords, SearchResult, getSuggest } from "models/search";


export default function Searchbar() {

    const [hotKeyWords, setHotKeyWords] = useState<SearchResult | undefined>(appData?.hotKeyWords)
    const [showList, setShowList] = useState(false)
    const [suggest, setSuggest] = useState<SearchResult | undefined>()
    const [kw, setKw] = useState('')
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

    const keyWords = suggest || hotKeyWords

    return (
        <div className="searchbar">
            <div className="search">
                <i className="type">课程</i>
                <input
                    className="keyword" type="text" placeholder="搜索课程"
                    onFocus={ev => setShowList(true)}
                    onBlur={ev => setShowList(false)}
                    onInput={ev => setKw((ev.target as HTMLInputElement).value)}
                />
                <div className="btn">
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