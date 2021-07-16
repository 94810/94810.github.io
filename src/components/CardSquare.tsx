import * as React from 'react';
import { CardProps } from './CardBig';

const marginCard = '1%';

export const CardSquare = (props: CardProps) =>(
  <div 
    className="card-square-container"
  >  
    <div className="card-square-image">
      <img src={props.imgSrc}/> 
    </div>
    <div 
      className='card-square-text'
    >
        <h1 className="card-square-title">{props.title}</h1>
        <div className="card-square-body">
          {props.body}
        </div>
    </div>
  </div>)