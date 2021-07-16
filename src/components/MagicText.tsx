import * as React from "react";
import useEventListener from "react-use-event-listener";
import { zArray } from "../utils/array";

type Color = [number, number, number];

export const MagickText = (props: {
    rep: number,
    coef: number,
    children: any,
    mainColor: Color,
    trailColor: Color
  }) =>{
  const [scroll, setScroll] = React.useState(0);

  useEventListener('scroll',() => setScroll(window.pageYOffset));

  return (
  <div className="magic-text-container">
    <div className="magic-text-center">
      {
        zArray(props.rep).map((_, i) =>{
          const color = !i ? props.mainColor : props.trailColor;

          return (<div className="magic-text-item" style={{
              zIndex: props.rep-i,
              transform: `translateY(${scroll*(props.coef*(i+1))}%)`,
              color: `rgb(${color.join(',')},${1/(i+1)+0.3})`
            }}>
            {props.children}
          </div>)}
          )
      }
    </div>
  </div>
)
}