import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import DatePicker from "react-datepicker";
import firebase from "./firebase.js";
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';
import { min } from "@tensorflow/tfjs";

const db = firebase.database();

function SelectDay(props) {
  const startDate = props.dateOne;
  return (
    <div className="d-flex justify-content-center my-2">
      <DatePicker popperPlacement="top-start" className="datepicker" selected={startDate} onChange={date => props.handleChange(date, 'dateOne')} />
    </div>
  );
}

const CustomizedDot = (props) => {
  const {
    cx, cy, stroke, payload, value,
  } = props;

  if(value == 0){
    return null;
  }
  if (value < 20 || value > 45) {
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
        <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
      </svg>
    );
  }
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
      <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
    </svg>
  );

};


export default class Week extends React.Component {

  shouldComponentUpdate() {
    return true;
  }

  constructor(props) {
    super(props);
    const date = new Date();
    date.setDate(date.getDate() - 7);
    this.state = {
      dateOne: date,
      data: [
        { name: 'Day 1', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 2', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 3', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 4', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 5', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 6', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
        { name: 'Day 7', sleep_time: 0, wakeup_time: 0, sleep:0 , move_count:0},
      ],
    };
    this.ReadFromFirebase = this.ReadFromFirebase.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.ReadFromFirebase();
  }

  render() {

    let avg = 0.0, day_len = 7;
    this.state.data.map(d => { 
      if( Number(d.sleep == 0)){
        day_len -= 1;
      }
      avg = avg + Number(d.sleep)
    })
    avg = (avg / day_len).toFixed(2);

    return (
      <div>
        <SelectDay dateOne={this.state.dateOne} handleChange={this.handleChange} />
        <div className="d-flex justify-content-center ">
          <LineChart
            width={600} height={300} data={this.state.data}
            margin={{ top: 5, right: 80, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line isAnimationActive={false} name="翻身次數" type="monotone" dataKey="move_count" stroke="#8884d8" dot={<CustomizedDot />} />
            <Line isAnimationActive={false} name="睡眠時數" type="monotone" dataKey="sleep" stroke="#82ca9d" dot={false} />
            <Legend />
          </LineChart>
          <div style={{ margin: 'auto 0', color:'#ced4da'}}>
            {/* <h4><i className="fa fa-balance-scale fa-5 mx-1"></i> Regularity: Poor</h4> */}
            <h4><i className="fa fa-line-chart mx-1 my-2"></i> Average: {avg} hr per week </h4>
          </div>
        </div>
      </div>
    )
  }


  handleChange(date, name) {
    this.setState({
      [name]: date
    }, () => {
      this.ReadFromFirebase();
    })
  }

  ReadFromFirebase() {
    var tmpdate = Array(7).fill(0);
    for(let i=0; i<7; i++){
      let tmp = this.state.dateOne;
      var nextdate = new Date(tmp.getTime() +  i*24 * 60 * 60 * 1000);
      tmpdate[i] = nextdate;
    }

    for (let i = 0; i < 7; i++) {
      let Day = tmpdate[i].getFullYear() + '-' + ("0" + (tmpdate[i].getMonth() + 1)).slice(-2) + '-' + ("0" + (tmpdate[i].getDate())).slice(-2);
      var starCountRef = firebase.database().ref(Day);
      starCountRef.once('value', (snapshot) => {
        if(snapshot.exists()){
          this.setState(prevState => {
            let tmp = (new Date(snapshot.val().wakeup_time)).getTime() - (new Date(snapshot.val().sleep_time)).getTime();
            var minutes = Math.floor((tmp / (1000 * 60)) % 60) /60,
                hours = Math.floor((tmp / (1000 * 60 * 60)) % 24);
            const newItems = [...prevState.data];
            newItems[i].name = (tmpdate[i].getMonth() + 1) + "/" +(tmpdate[i].getDate());
            newItems[i].sleep_time = snapshot.val().sleep_time;
            newItems[i].wakeup_time = snapshot.val().wakeup_time;
            newItems[i].sleep = (hours+minutes).toFixed(2) ;
            newItems[i].move_count = snapshot.val().move_count;
            return {data: newItems};
          })
        }else{
          this.setState(prevState => {
            const newItems = [...prevState.data];
            newItems[i].name =(tmpdate[i].getMonth() + 1) + "/" +(tmpdate[i].getDate());
            newItems[i].sleep_time = 0;
            newItems[i].sleep = 0;
            newItems[i].wakeup_time = 0;
            newItems[i].move_count = 0;
            return {data: newItems};
          })
        }
      });
    }
  }
}