/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable default-case */
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './Popular.css';

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function MediaComponent(item) {
    switch (item.type) {
        case 'video':
            return (
                <Video {...item} />
            );
        case 'article':
            return (
                <Article {...item}/>
            );  
    }

}

function withCheckingForNew(Component) {
    function Wrapper(props) {
        switch (props.type) {
            case 'video':
                if (props.views > 1000) {
                  return <Popular><Component {...props}/></Popular>
                }
                return (
                    <Component {...props}/>
                );
    
            case 'article':
                if (props.views < 100) {
                  return <New><Component {...props}/></New>
                }
                return (
                    <Component {...props}/>
                );
            default:
                return false;
        }
    }
    return Wrapper;
  }

function List(props) {
    return props.list.map(item => {
        const NewItem = withCheckingForNew(MediaComponent);
        return <NewItem {...item} key={nanoid()}/>;
    })
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}