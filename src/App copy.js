import React from 'react';
import styled from 'styled-components';
import size from './size';

const TimeBoxWrapper = styled.div`
  font-size: ${size.FONT.LARGE}px;
`

const BinaryClockWrapper = styled.div`
  background-color: lightpink;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      hh: now.getHours(),
      mm: now.getMinutes(),
      ss: now.getSeconds()
    };
    // updateメソッドがstateを更新できるようにするためにbindしておく
    // bindしない場合、updateメソッドはグローバルなWindowオブジェクトを参照してしまう
    this.update = this.update.bind(this);
  }

  update() {
    const now = new Date();
    const hh = this.padNumbersWithZero(now.getHours());
    const mm = this.padNumbersWithZero(now.getMinutes());
    const ss = this.padNumbersWithZero(now.getSeconds());
    this.setState({
      hh: hh,
      mm: mm,
      ss: ss
    })
  }

  padNumbersWithZero(s) {
    s = "00" + s;
    return s.substr(s.length - 2, 2)
  }

  componentDidMount() {
    setInterval(this.update, 1000);
  }

  render() {
    return (
      <>
        <TimeBoxWrapper>
          {this.state.hh}:{this.state.mm}:{this.state.ss}
        </TimeBoxWrapper>
        {/* <BinaryClockWrapper>
          haha
        </BinaryClockWrapper> */}
      </>
    );
  }
}

export default App;
