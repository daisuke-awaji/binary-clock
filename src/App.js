import React from 'react';
import styled from 'styled-components';
import size from './size';

const FlexContainer = styled.div`
  padding: 30px;
  text-align: center;
`
const TimeBoxWrapper = styled.div`  
  margin: 10px;
  text-align: center;
  font-size: ${size.FONT.LARGE}px;
`
const BinaryClockWrapper = styled.div`
  margin: 10px;
  font-size: ${size.FONT.EXTRALARGE}px;
  text-align: center;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hh: '',
      mm: '',
      ss: '',
      lines: []
    };
    // updateメソッドがstateを更新できるようにするためにbindしておく
    // bindしない場合、updateメソッドはグローバルなWindowオブジェクトを参照してしまう
    this.update = this.update.bind(this);
  }

  update() {
    const now = new Date();
    const hh = this._padNumbersWithZero(now.getHours());
    const mm = this._padNumbersWithZero(now.getMinutes());
    const ss = this._padNumbersWithZero(now.getSeconds());
    const lines = this._calculateBinaryClock(hh + mm + ss);

    this.setState({
      hh: hh,
      mm: mm,
      ss: ss,
      lines: lines
    })
  }

  _padNumbersWithZero(s) {
    s = "00" + s;
    return s.substr(s.length - 2, 2)
  }

  _calculateBinaryClock(hhmmss) {
    const lines = [];
    for (let i = 0; i < hhmmss.length; i++) {
      // 1文字ずつ抽出
      const v = parseInt(hhmmss.substr(i, 1));
      // 2進数に変換して4桁に揃える
      const bin = "0000" + v.toString(2);
      const bin8 = bin.substr(bin.length - 4, 4);
      // 0, 1を記号に変換する
      lines.push(this.replaceZeroOneToViewObject(bin8));
      lines.push(<br />)
    }
    return lines;
  }

  replaceZeroOneToViewObject(bin8) {
    const list = []
    for (let i = 0; i < bin8.length; i++) {
      if (bin8.substr(i, 1) === '0') {
        list.push(<span>○</span>);
      } else {
        list.push(<span>●</span>);
      }
    }
    return list
  }

  componentDidMount() {
    setInterval(this.update, 1000);
  }

  render() {
    return (
      <FlexContainer>
        <TimeBoxWrapper>
          {this.state.hh ? this.state.hh : '--'}:{this.state.mm ? this.state.mm : '--'}:{this.state.ss ? this.state.ss : '--'}
        </TimeBoxWrapper>
        <BinaryClockWrapper>
          {this.state.lines}
        </BinaryClockWrapper>
      </FlexContainer>
    );
  }
}

export default App;
