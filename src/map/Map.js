import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import Hexagon from '../Hexagon/Hexagon';
// import Layout from './Layout';
// import cat from './cat.jpg';
import Points from '../models/Points';
import Circle from '../icons/circle';
import { getStars } from '../testStars';
// import arrow from './Down_Arrow_Icon.png';

class Map extends Component {

  constructor(props) {
    super(props);
    let stars = getStars();
    this.state = {stars};
  }

  render() {

    // <svg width="800" height="600" viewBox={"-50 -50 50 50"}>
    const size = 40;
    const svgWidth = 865;
    const svgHeight = 740;
    const width = (Math.sqrt(3) / 2) * (size * 2);
    let pointsss = new Points(size);
    const cornerCoords = pointsss.getPoints();
    let hexes = [];
    let q = 0;
    // let r = 0;
    let i = 0;
    let iSize = 0;
    let jSize = 0;
    // let maxI = 12;
    // let maxJ = 8;
    // let maxJ = Math.floor((720 - (width / 2)) / width);
    let j;
    let children;
    // console.error(maxI, maxJ)
    let stars = this.state.stars;
    while(iSize <= svgHeight) {
      j = 0;
      q = 0 - Math.floor(i / 2);
      jSize = ((i % 2 ) * Math.floor(width / 2));
      while (jSize < svgWidth) {
      if (stars[`${i}-${j}`]) {
        children = [<Circle key={`circle-i${i}-j${j}`} className={stars[`${i}-${j}`]} x={cornerCoords[0].x} y={(cornerCoords[1].y + cornerCoords[2].y) / 2} size={size / 6 } ></Circle>]
        // console.error(s[`${i}-${j}`])
      } else {
        children = undefined;
      }
        hexes.push(
          <Hexagon key={`hexagon-q${q}-i${i}`} q={q} r={i} s={0} size={size} >
            {children}
          </Hexagon>
        );
        jSize += width;
        j++;
        q++;
      }
      iSize += (((i % 2) + 1) * size);
      i++;
    }
    return (
      <div className="App">
        <svg width={svgWidth} height={svgHeight} style={{border: '1px solid white'}}>
        {hexes}
        </svg>
      </div>
    );
  }
}

/*
<Hexagon q={0} r={0} s={0} size="40" ></Hexagon>
<Hexagon q={1} r={0} s={0} size="40" ></Hexagon>
<Hexagon q={2} r={0} s={0} size="40" ></Hexagon>
<Hexagon q={0} r={1} s={0} size="40" ></Hexagon>
<Hexagon q={1} r={1} s={0} size="40" ></Hexagon>
<Hexagon q={2} r={1} s={0} size="40" ></Hexagon>
<Hexagon q={-1} r={2} s={0} size="40" ></Hexagon>
<Hexagon q={-0} r={2} s={0} size="40" ></Hexagon>
<Hexagon q={1} r={2} s={0} size="40" ></Hexagon>
*/


//
//<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
// <polygon points="200,10 250,190 160,210" />
export default Map;


/*
hex with jpg
<pattern id="pat1" patternUnits="objectBoundingBox" x={0} y={0} width={10} height={10}>
<image xlinkHref={cat} x={0} y={0} width={40} height={40} />
</pattern>
    <Hexagon q={0} r={0} s={0} fill="pat1"></Hexagon>
*/

/*
old size calc

while((svgHeight - (size * 2)) >= ((Math.floor((i / 2)) * size) + (Math.floor((i / 2) + (i % 2)) * size * 2))) {
console.error(i)
console.error(Math.floor((i / 2)) * size)
console.error(Math.floor((i / 2) + (i % 2)) * size * 2)
console.error(svgHeight / ((Math.floor((i / 2)) * size) + (Math.floor((i + 1) + (i % 2)) * size * 2)))
  j = 0;
  q = 0 - Math.floor(i / 2);
  r = i;

  while ((j + 1) < ((svgWidth - ((j % 2 ) * Math.floor(width / 2))) / width)) {
    hexes.push(<Hexagon q={q} r={r} s={0} size={size} ></Hexagon>);
    j++;
    q++;
  }
  i++;
}

*/
