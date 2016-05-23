require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'
import ControllerUnit from './ControllerUnit'
import ImgFigure from './ImgFigure'
import imageDatas from '../data/imagesData.json'

imageDatas.forEach(function(item) {
  item.imageURL = '../images/' + item.fileName;
});

function getRandomFromRange(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

function getDegree() {
  let degree = Math.ceil(Math.random() * 30);
  return Math.random() > 0.5
    ? -degree
    : degree;
}

//主容器
class PhotoGrally extends React.Component {

  constructor() {
    super();
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [
          0, 0
        ],
        rightSecX: [
          0, 0
        ],
        y: [0, 0]
      },
      vPosRange: {
        x: [
          0, 0
        ],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: []
    }
  }

  // 重新布局图片
  //居中 currentIndex稍微图片
  rearrange(currentIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      hPosRangeLeftSecX = this.Constant.hPosRange.leftSecX,
      hPosRangeRightSecX = this.Constant.hPosRange.rightSecX,
      hPosRangeY = this.Constant.hPosRange.y,
      vPosRangeTopY = this.Constant.vPosRange.topY,
      vPosRangeTopX = this.Constant.vPosRange.x,
      centerPos = this.Constant.centerPos;

    imgsArrangeArr[currentIndex] = {
      pos: centerPos,
      center: true
    };

    let topImgNum = Math.floor(Math.random() * 2);
    let topIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    let hasTop = false;
    if (topImgNum && topIndex !== currentIndex) {
      hasTop = true;
      imgsArrangeArr[topIndex] = {
        pos: {
          left: getRandomFromRange(vPosRangeTopX[0], vPosRangeTopX[1]),
          top: getRandomFromRange(vPosRangeTopY[0], vPosRangeTopY[1])
        },
        rotateDegree: getDegree()
      }
    }

    for (let i = 0, length = imgsArrangeArr.length; i < length; i++) {
      if (i === currentIndex || (hasTop && i === topIndex))
        continue;

      let hPosRangeX = i & 1
        ? hPosRangeLeftSecX
        : hPosRangeRightSecX;
      imgsArrangeArr[i] = {
        pos: {
          left: getRandomFromRange(hPosRangeX[0], hPosRangeX[1]),
          top: getRandomFromRange(hPosRangeY[0], hPosRangeY[1])
        },
        rotateDegree: getDegree()
      }
    }
    this.setState({imgsArrangeArr: imgsArrangeArr});
  }

  componentDidMount() {
    // 拿到舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 拿到 ImgFigure 的 大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.Constant.centerPos = {
      left: halfStageW - halfImgW/0.66,
      top: halfStageH - halfImgH/0.66
    };

    this.rearrange(0);

  }
  // 居中点击图片
  center(index) {
    return () => this.rearrange(index);
  }

  // 翻转当前图片
  reserve(index) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    return () => {
      imgsArrangeArr[index].reserve = !imgsArrangeArr[index].reserve;
      this.setState({imgsArrangeArr: imgsArrangeArr});
    }
  }

  render() {
    let controllerUnits = [];
    let imgFigures = [];
    imageDatas.forEach(function(item, index) {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          reserve: false
        }
      }

      let action = {
        center: this.center(index),
        reserve: this.reserve(index)
      }

      imgFigures.push(<ImgFigure key={index} data={item} action={action} ref={'imgFigure' + index} styleSetting={this.state.imgsArrangeArr[index]}/>);

      controllerUnits.push(<ControllerUnit key={index} action={action} styleSetting={this.state.imgsArrangeArr[index]}/>)

    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures.map(function(result) {
            return result;
          })}
        </section>
        <ul className="controller-nav">
          {controllerUnits.map(function(result) {
            return result;
          })}
        </ul>
      </section>
    );
  }
}

PhotoGrally.defaultProps = {};

export default PhotoGrally;
