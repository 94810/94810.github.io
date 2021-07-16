import * as React from 'react';
import { CardBig, CardProps } from './CardBig';

export const CardDeck = (props: {cardDescriptor:  Omit<CardProps, 'imgSrcFloat'>[]}) => (
    <div className="card-deck">
      {
        props.cardDescriptor.map(
          (descriptor, index) => {
            return <CardBig title={descriptor.title} imgSrc={descriptor.imgSrc} body={descriptor.body} imgFloatLeft={!(index%2)}/>
          }
        )
      }
    </div>
 )