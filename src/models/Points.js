import Point from './Point';

export default class Points {

  constructor(size) {
    let points = [];
    let height = size * 2;
    const width = Math.sqrt(3)/2 * height;
    points.push(new Point(width / 2, 0));
    points.push(new Point(width, height / 4));
    points.push(new Point(width, (3 * height) / 4));
    points.push(new Point(width / 2, height));
    points.push(new Point(0, (3 * height) / 4));
    points.push(new Point(0, height / 4));
    this.state = {points};
  }

  getPoints() {
    return this.state.points;
  }
}
