import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

type MyProps = {

}

type MyState = {
  currentTime: string,
  alarmTime: string,
  betaAlarmTime: string,
  alarmMessage: string
}


export default class App extends React.Component<MyProps, MyState> {

  state: MyState = {
    currentTime: '',
    alarmTime: '',
    betaAlarmTime: '',
    alarmMessage: ""
  };


  // when component mounts, starts two timers that check every second the current time and if there is an alarm set
  componentDidMount() {
    var clock = setInterval(() => this.setCurrentTime(), 1000)
    var interval = setInterval(() => this.checkAlarmClock(), 1000)
  }

  //gets current time
  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
    });
  }


  clearAlarm() {
    this.setState({
      betaAlarmTime: '',
      alarmTime: '',
      alarmMessage: ''
    });
    console.log("Timer cleared");
  }

  //any time input changes, sends new input into the state as betaAlarmTime
  setAlarmTime(event: any) {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({
      betaAlarmTime: event.target.value
    });
    console.log("Alarm time: " + this.state.betaAlarmTime)
  }


  //sets the alarm on button press
  setRealAlarm() {
    if (this.state.betaAlarmTime !== '') {
      this.setState({
        alarmTime: this.state.betaAlarmTime
      })
      console.log("Alarm Set");
    }
  }

  // checks if current time is equal to alarm time
  checkAlarmClock() {
    if (this.state.alarmTime !== 'undefined' && this.state.alarmTime) {
      this.setState({
        alarmMessage: "Your alarm is set for " + this.state.alarmTime + "."
      })
      if (this.state.currentTime === this.state.alarmTime) {
        alert("its time!");
        this.setState({
          betaAlarmTime: '',
          alarmTime: '',
          alarmMessage: ''
        });
      }
    }
  }

  render() {
    return (
      <div className="timer_container">
        <h1>Cooking Alarm</h1>
        <h2>Time: {this.state.currentTime}</h2>
        <h2>{this.state.alarmMessage}</h2>
        <form>
          <input type="time" step="1" onChange={this.setAlarmTime.bind(this)}></input>
        </form>
        <Button variant="outlined" type="button" onClick={this.setRealAlarm.bind(this)}> Start </Button>
        <Button variant="outlined" type="button" onClick={this.clearAlarm.bind(this)}> Reset </Button>
      </div>
    );
  }
}

