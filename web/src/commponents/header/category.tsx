import React from "react";

export default function Category() {
    const categories = [
        // category
            // ID number
            // title string
            // items? category[]
            // children? category[]
        {
            ID: 1, title: 'IT互联网', items: [
                { ID: 1, title: '前端开发' },
                { ID: 2, title: 'Java' },
                { ID: 3, title: '产品策划' },
            ],
            children: [
                {
                    ID: 2, title: '前沿技术', items: [
                        { ID: 4, title: '云计算' },
                        { ID: 5, title: '云原生' },
                        { ID: 6, title: '区块链' },
                    ]
                },
                {
                    ID: 3, title: '互联网产品', items: [
                        { ID: 7, title: '云计算' },
                        { ID: 8, title: '云原生' },
                    ]
                }
            ]
        },
        {
            ID: 4, title: '设计创作', items: [
                { ID: 9, title: '平面设计' },
                { ID: 10, title: '室内设计' },
                { ID: 11, title: '绘画创作' },
            ],
            children: [
                {
                    ID: 5, title: '环境艺术设计', items: [
                        { ID: 12, title: '建筑设计' },
                        { ID: 13, title: '景观设计' },
                        { ID: 14, title: '其他' },
                    ]
                }
            ]
        }
    ];

    return (
        <div className="category">
            <div className="title-container">
                <i className="icon icon-menu" />
                <span>分类</span>
            </div>


            <div className="list-container">
                <ul className="list">
                    {categories.map(category => (
                        <li>
                            <div className="content">
                                <div className="title">{category.title}</div>
                                <div className="sub-title">
                                    <ul>
                                        {category.items.map(item => (
                                            <li>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="sub-list">
                                <ul className="sub-list-ul">
                                    {category.children.map(item => (
                                        <li className="sub-list-li">
                                            <div className="main">
                                                {item.title}
                                            </div>
                                            <div className="list">
                                                <ul>
                                                    {item.items.map(item => (
                                                        <li>{item.title}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}