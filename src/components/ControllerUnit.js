import React from 'react';

class controllerUnit extends React.Component {

  handleClick(e) {
    let isCenter = this.props.styleSetting.center;
    if (isCenter){
      this.props.action.reserve();
    } else {
      this.props.action.center();
    }

    e.preventDefault();
    e.stopPropagation();}

  render() {

    let className = 'controller-util';
    if (this.props.styleSetting.center) {
      className += ' on';
    }
    if (this.props.styleSetting.reserve) {
      className += ' reserve';
    }
    return (
      <li className={className} onClick={this.handleClick.bind(this)}></li>
    )
  }

}

export default controllerUnit;
