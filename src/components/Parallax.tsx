import * as React from "react";
import { useState } from "react";
import useEventListener from "react-use-event-listener";

export const ParallaxBackground = (props: {coef: number, className: string, children: any}) => {
  const [offset, setOffset] = useState(0);

  useEventListener('scroll', () => {
    const ratio = window ? window.innerWidth/(window.innerHeight*0.80) : 0;
    const coef = ratio <= 1 ? 0 : ratio * props.coef;
    setOffset(window.pageYOffset * coef)
  })

  return (
    <div className={props.className} style={{ backgroundPositionY: offset}}>
      {props.children}
    </div>
  )
}
