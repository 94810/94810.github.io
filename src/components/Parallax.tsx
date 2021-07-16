import * as React from "react";
import { useState } from "react";
import useEventListener from "react-use-event-listener";

export const ParallaxBackground = (props: {coef: number, className: string, children: any}) => {
  const [offset, setOffset] = useState(0);

  useEventListener('scroll', () => setOffset(window.pageYOffset * props.coef))

  return (
    <div className={props.className} style={{ backgroundPositionY: offset}}>
      {props.children}
    </div>
  )
}
