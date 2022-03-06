import React, { useState, useEffect } from "react";

import { appData } from "models/app";
import { getHotKeyWords, SearchResult } from "models/search";


export default function Searchbar() {

    const [hotKeyWords, setHotKeyWords] = useState<SearchResult | undefined>(appData?.hotKeyWords)
    useEffect(() => {
        if (!hotKeyWords) {
            getHotKeyWords().then(arr => {
                setHotKeyWords(arr);    //?????
            })
        }
    }, [hotKeyWords])
    // console.log(hotKeyWords)
    return (
        <div className="searchbar">
            <div className="search">
                <i className="type">课程</i>
                <input className="keyword" type="text" placeholder="搜索课程" />
                <div className="btn">
                    <i className="icon icon-search-w" />
                </div>
            </div>
            <div className="list">
                <div className="title">热门搜索</div>
                {hotKeyWords ? (
                    <ul>
                        {hotKeyWords.map((kw, index) => (
                            <li key={index}>{kw}</li>
                        ))}
                    </ul>) : ''}
            </div>
        </div>
    )
}