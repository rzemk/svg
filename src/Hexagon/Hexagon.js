import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hex from '../models/Hex';
import Point from '../models/Point';
import Points from '../models/Points';
// import Orientation from '../models/Orientation';
import HexUtils from '../HexUtils';

class Hexagon extends Component {
  static propTypes = {
    q: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    fill: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    data: PropTypes.object,
    children: PropTypes.node
  };

  static contextTypes = {
    layout: PropTypes.object, // TODO Shape
    points: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    const { q, r, s } = props;
    // const { layout } = context;
    const hex = new Hex(q, r, s);
    // const opixel = HexUtils.hexToPixel(hex, layout, props.size);
    // console.error('original pixel')
    // console.error(opixel)
    const pixel = this.hex_to_pixel(hex);
    this.state = { hex, pixel, size: props.size };
    // console.error(props);
  }
  hex_to_pixel(hex) {
      let x = this.props.size * Math.sqrt(3) * (hex.q + hex.r/2)
      let y = this.props.size * 3/2 * hex.r
      // console.error('returning new hex to pixel')
      // console.error(x, y);
      return new Point(x, y)
    }

  // TODO Refactor to reduce duplicate
  componentWillReceiveProps(nextProps) {
    const { q, r, s } = nextProps;
    const { layout } = this.context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout, nextProps.size);
    this.setState({ hex, pixel });
  }

  calculateCoordinates(orientation) {
      const corners = [];
      const center = new Point(0, 0);
      const { size } = this.props;

      for (let i = 0; i < 6; i++) {
        const offset = this.getPointOffset(i, orientation, size);
        const point = new Point(center.x + offset.x, center.y + offset.y);
        corners.push(point);
      };

      return corners;
    }

  getPointOffset(corner, orientation, size) {
    let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
    return new Point(size * Math.cos(angle), size * Math.sin(angle));
  }

  onClick(e) {
    console.error(`the (${this.props.q})-(${this.props.r}) hexagon onClick`);
    // if (this.props.onClick) {
    //   this.props.onClick(e, this);
    // }
  }

  render() {
    const { fill, className, size } = this.props;
    const { pixel } = this.state;
    const fillId = (fill) ? `url(#${fill})` : null;

    // const orientation = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);

    // const cornerCoords = this.calculateCoordinates(orientation);
    let pointsss = new Points(size);
    // console.error('this is the new points way')
    // console.error(pointsss)
    const cornerCoords = pointsss.getPoints();
    const points = cornerCoords.map(point => `${point.x},${point.y}`).join(' ');

    // <Circle x={cornerCoords[0].x} y={cornerCoords[1].y} size={size / 2} ></Circle>
    return (
      <g
        className={classNames('hexagon-group', className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
        onClick={e => this.onClick(e)}
      >
        <g className="hexagon">
          <polygon points={points} fill={fillId} />
          {this.props.children}
        </g>
      </g>
    );
  }
}
// <circle cx={cornerCoords[1].x} cy={cornerCoords[3].y} r={size / 4} stroke="green" strokeWidth="1" fill="yellow" />
// transform={`translate(${-45}, ${-40})`}

export default Hexagon;
