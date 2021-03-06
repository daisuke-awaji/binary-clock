import React from "react";
import styled from "styled-components";
import size from "./size";

const FlexContainer = styled.div`
  padding: 30px;
  text-align: center;
  background-color: black;
  height: 100%;
`;
const TimeBoxWrapper = styled.div`
  margin: 10px;
  text-align: center;
  font-size: ${size.FONT.LARGE}px;
  color: white;
`;
const BinaryClockWrapper = styled.div`
  margin: 10px;
  font-size: ${size.FONT.EXTRALARGE}px;
  text-align: center;
`;

const AquaSpan = styled.span`
  color: rgb(18%, 85.9%, 80.8%);
`;
const GraySpan = styled.span`
  color: gray;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "",
      minutes: "",
      seconds: "",
      lines: []
    };
    // updateメソッドがstateを更新できるようにするためにbindしておく
    // bindしない場合、updateメソッドはグローバルなWindowオブジェクトを参照してしまう
    this.update = this.update.bind(this);
  }

  update() {
    const now = new Date();
    const hours = this._padNumbersWithZero(now.getHours());
    const minutes = this._padNumbersWithZero(now.getMinutes());
    const seconds = this._padNumbersWithZero(now.getSeconds());
    const lines = this._calculateBinaryClock(hours + minutes + seconds);

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      lines: lines
    });
  }

  _padNumbersWithZero(s) {
    s = "00" + s;
    return s.substr(s.length - 2, 2);
  }

  _calculateBinaryClock(hms) {
    const lines = [];
    for (let i = 0; i < hms.length; i++) {
      // 1文字ずつ抽出
      const v = parseInt(hms.substr(i, 1));
      // 2進数に変換して4桁に揃える
      const bin = "0000" + v.toString(2);
      const bin8 = bin.substr(bin.length - 4, 4);
      // 0, 1を記号に変換する
      lines.push(this._replaceZeroOneToViewObject(bin8));
      lines.push(<br key={i} />);
    }
    return lines;
  }

  _replaceZeroOneToViewObject(bin8) {
    const list = [];
    for (let i = 0; i < bin8.length; i++) {
      if (bin8.substr(i, 1) === "0") {
        list.push(<GraySpan key={i}>●</GraySpan>);
      } else {
        list.push(<AquaSpan key={i}>●</AquaSpan>);
      }
    }
    return list;
  }

  componentDidMount() {
    setInterval(this.update, 1000);
  }

  render() {
    return (
      <FlexContainer>
        <TimeBoxWrapper>
          {this.state.hours ? this.state.hours : "--"}:
          {this.state.minutes ? this.state.minutes : "--"}:
          {this.state.seconds ? this.state.seconds : "--"}
        </TimeBoxWrapper>
        <BinaryClockWrapper>{this.state.lines}</BinaryClockWrapper>
      </FlexContainer>
    );
  }
}

export default App;
