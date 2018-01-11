import React, { Component } from 'react';
import classNames from 'classnames';

export default class Circle extends Component {

  onClick = (e) => {
    console.error(`the (${this.props.x})-(${this.props.y}) circle onClick`);
    // if (this.props.onClick) {
    //   this.props.onClick(e, this);
    // }
    this.cancelBubble(e);
  }

  cancelBubble(e) {
      // e.cancelBubble = true;
      if(e.stopPropagation) {
       e.stopPropagation();
     } else {
       e.cancelBubble=true;
     }
  }

  render() {
    // return <circle cx={this.props.x} cy={this.props.y} r={this.props.size / 4} stroke="green" strokeWidth="1" fill="yellow" />;
    return (<g
      className={classNames('circle-group', 'circle')}
      onClick={e => this.onClick(e)}
    >
      <g className="circle">
        <circle cx={this.props.x} className={this.props.className} cy={this.props.y} r={this.props.size} stroke="orange" strokeWidth="1"  />
      </g>
    </g>
  );
  }
}
