import { CategoryData } from "models/category";
import React, { useState, useEffect } from "react";
// import { appData } from 'models/app'
import { connect } from "react-redux";
import { RootState, Dispatch, actions, SiteState } from "@/store";
import { Link } from "react-router-dom";
import * as routers from '@/router'
interface Props {
    site?: SiteState,
    dispatch: Dispatch,
}


// let categories: CategoryData[] = (window as any).categories

export default connect((state: RootState) => {
    return state
})(Category)


function Category(props: Props) {
    const [categories, setCategories] = useState<CategoryData[] | undefined>(props.site?.CategoryData)
    if (!categories) {
        props.dispatch(actions.site.getAllCategory())
    }
    useEffect(() => {
        setCategories(props.site?.CategoryData)
    }, [props.site?.CategoryData])

    return (
        <div className="category">
            <div className="title-container">
                <i className="icon icon-menu" />
                <span>分类</span>
            </div>

            <div className="list-container">
                <ul className="list">
                    {categories ? (categories.map(category => (
                        <li key={category.ID}>
                            <div className="content">
                                <Link
                                    to={routers.list(category.ID, 1)}
                                    className="title">{category.title}
                                </Link>
                                <div className="sub-title">
                                    {category.items ? (<ul>
                                        {category.items.map(item => (
                                            <li key={item.ID}>
                                                <Link
                                                    to={routers.list(item.ID, 3)}
                                                >{item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>) : ''}
                                </div>
                            </div>
                            <div className="sub-list">
                                <ul className="sub-list-ul">
                                    {category.children ? (category.children.map(item => (
                                        <li className="sub-list-li" key={item.ID}>
                                            <Link key={item.ID} to={routers.list(item.ID, 2)}>
                                                <div className="main">
                                                    {item.title}
                                                </div>
                                            </Link>
                                            <div className="list">
                                                <ul>
                                                    {item.children ? (item.children.map(item => (
                                                        <Link key={item.ID} to={routers.list(item.ID, 3)}>
                                                            <li >{item.title}</li>
                                                        </Link>
                                                    ))) : ''}
                                                </ul>
                                            </div>
                                        </li>

                                    ))) : ''}
                                </ul>
                            </div>
                        </li>
                    ))) : ''}
                </ul>
            </div>
        </div>
    )
}

