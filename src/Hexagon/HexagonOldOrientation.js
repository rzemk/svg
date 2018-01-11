import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hex from '../models/Hex';
import Point from '../models/Point';
import Orientation from '../models/Orientation';
import HexUtils from '../HexUtils';
import logo from '../logo.svg';
import arrow from '../Down_Arrow_Icon.png';
import Circle from '../icons/circle';

class Hexagon extends Component {
  static propTypes = {
    q: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    fill: PropTypes.string,
    size: PropTypes.string,
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
    const { layout } = context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout, props.size);
    this.state = { hex, pixel, size: props.size };
    console.error(props);
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

      Array.from(new Array(6), (x, i) => {
        const offset = this.getPointOffset(i, orientation, size);
        const point = new Point(center.x + offset.x, center.y + offset.y);
        corners.push(point);
      });

      return corners;
    }

  getPointOffset(corner, orientation, size) {
    // size = {x: 50, y: 50};
    let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
    return new Point(size * Math.cos(angle), size * Math.sin(angle));
  }

  render() {
    const { fill, className, size } = this.props;
    const { hex, pixel } = this.state;
    const fillId = (fill) ? `url(#${fill})` : null;

    const orientation = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);

    const cornerCoords = this.calculateCoordinates(orientation);
    const points = cornerCoords.map(point => `${point.x},${point.y}`).join(' ');

    return (
      <g
        className={classNames('hexagon-group', className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
      >
        <g className="hexagon">
          <polygon points={points} fill={fillId} />
          <Circle x={cornerCoords[0].x} y={cornerCoords[0].y} size={size} ></Circle>
          <img src={arrow} />
        </g>
      </g>
    );
  }
}
// <circle cx={cornerCoords[1].x} cy={cornerCoords[3].y} r={size / 4} stroke="green" strokeWidth="1" fill="yellow" />
// transform={`translate(${-45}, ${-40})`}

export default Hexagon;
