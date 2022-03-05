export default function Category() {
    const categories = [
        {
            title: 'IT互联网', sublist: ['前端开发', 'Java', '产品策划'], children: [
                { title: '前沿技术', children: ['云计算', '云原生', '区块链'] },
                { title: '前沿技术', children: ['云计算', '云原生', '区块链'] }
            ]
        },
        {
            title: 'IT互联网', sublist: ['前端开发', 'Java', '产品策划'], children: [
                { title: '前沿技术', children: ['云计算', '云原生', '区块链', '物联网'] }
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
                                        {category.sublist.map(item => (
                                            <li>{item}</li>
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
                                                    {item.children.map(item => (
                                                        <li>{item}</li>
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