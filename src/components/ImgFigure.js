import React from 'react'

// 图片容器
class ImgFigure extends React.Component {

  handleClick(e) {

    if (this.props.styleSetting.center) {

      this.props.action.reserve();
    } else {
      this.props.action.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};
    let setting = this.props.styleSetting;
    if (setting) {
      for (var key in setting.pos) {
        styleObj[key] = setting.pos[key];
      }
    }
    let imgFigureClassName = 'img-figure';
    if (setting.center) {
      styleObj.zIndex = 99;
      imgFigureClassName += " on"
    }
    if (setting.rotateDegree) {
      styleObj.transform = 'rotate(' + setting.rotateDegree + 'deg)';
    }

    if (setting.reserve) {
      imgFigureClassName += ' reserve'
    }
    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={(this.handleClick).bind(this)}>
        <img src={this.props.data.imageURL}/>
        <figcaption className="img-title">
          <h2 >
            {this.props.data.title}
          </h2>
        </figcaption >
        <figcaption className="img-back">
          <h3 >
            {this.props.data.description}
          </h3>
        </figcaption >
      </figure>

    )
  }
}

export default ImgFigure;
