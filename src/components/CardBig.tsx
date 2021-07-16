import * as React from 'react';

const marginCard = '1%';

export type CardProps = {
  title: React.ReactNode,
  imgSrc?: any,
  imgFloatLeft?: boolean,
  body: any
};

export const CardBig = (props: CardProps) =>(
  <div 
    className="card-container"
  >      
    {
        props.imgSrc ?
        <div className="card-image"
          style={{ 
            float: props.imgFloatLeft ? 'left' : 'right',
            marginLeft: props.imgFloatLeft ? 0 : marginCard,
            marginRight: props.imgFloatLeft ? marginCard : 0
          }} 
        >
          <img src={props.imgSrc}/> 
        </div>
        : null
      }
      <div 
        className='card-text'
        style={{ 
          float: props.imgFloatLeft ? 'left' : 'right',
        }} 
      >
        <h1 className="card-title">{props.title}</h1>
        <div className="card-body">
          {props.body}
        </div>
    </div>
  </div>)