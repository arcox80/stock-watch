import React from 'react';

//import '../article.css';

export default function Article(props) {
  return (
      <div>
          <a href={props.link}>
            <h4>{props.title}</h4>
          </a>
          <p>{props.description}</p>
      </div>
  );
};