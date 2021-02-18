import firebase from "./firebase.js";
import HighchartsWrapper from './chart.jsx'
import React from 'react';
import DatePicker from "react-datepicker";

function SelectDay(props) {
  const startDate = props.dateOne;
  return (
    <div className="d-flex justify-content-center" style={{margin:'1rem 0 0 0'}} >
      <DatePicker className="datepicker" selected={startDate} onChange={date => props.handleChange(date, 'dateOne')} />
    </div>
  );
}


export default class Day extends React.Component {

    constructor(props) {
        super(props);
        const date = new Date();
        date.setDate(date.getDate() - 1 );
        this.state = {
          dateOne: date,
          efficiency:0,
          move_count:0,
          inbed:"",
          sleep:"",
          awake:"",
          series: [{
            type: 'pie',
            name: 'Browser',
            data: [
            ]
        }]
        };
        this.ReadFromFirebase = this.ReadFromFirebase.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
      this.ReadFromFirebase();
    }

    handleChange(date, name) {
    
      this.setState({
        [name]: date
      }, () => {
        this.ReadFromFirebase();
      })
  
    }
    
    render(){
      console.log("render",this.state.series)
        return(
            <div>
              <HighchartsWrapper chartData={this.state.series}/>
              <div className="d-flex justify-content-center" style={{margin:'1rem 0 0 0'}}>
              <i className="fa fa-circle mx-1" style={{color:'#a6808c'}}> 就寢 &nbsp; </i>
              <i className="fa fa-circle mx-1" style={{color:'rgb(255,230,167)'}}> 入睡 &nbsp; </i>
              <i className="fa fa-circle mx-1" style={{color:'rgb(240,113,103)'}}> 翻身({this.state.move_count}) &nbsp;</i>
              <i className="fa fa-circle mx-1" style={{color:'#706677'}}> 離床 &nbsp;</i>
              </div>
              <SelectDay dateOne={this.state.dateOne} handleChange={this.handleChange} />
              <div className="d-flex justify-content-center" style={{color:'#ced4da'}} >
              <div className="fa fa-bed fa-2x" aria-hidden="true" style={{margin:"0 0.5rem 0 0.5rem "}}></div>
              <h4>InBed: &nbsp;</h4>
              <h4 style={{color:'#a6808c'}}>{` ${(this.state.inbed).split(":")[0]}:${(this.state.inbed).split(":")[1]}`}</h4>
              </div>
              <div className="d-flex justify-content-center" style={{color:'#ced4da'}}>
              <i  style={{margin:"0 0.5rem 0 0.5rem " , fontSize :'25px'}}>z<sup> z </sup> </i>
              <h4>Asleep: &nbsp;</h4>
              <h4 style={{color:'rgb(255,230,167)'}}>{` ${(this.state.sleep).split(":")[0]}:${(this.state.sleep).split(":")[1]}`}</h4>
              </div>
              <div className="d-flex justify-content-center" style={{ color:'#ced4da'}} >
              <div className="fa fa-sun-o fa-2x " aria-hidden="true" style={{margin:"0 0.5rem 0 0.5rem "}}></div>
              <h4>WakeUp: &nbsp;</h4>
              <h4 style={{color:'#706677'}}>{` ${(this.state.awake).split(":")[0]}:${(this.state.awake).split(":")[1]}`}</h4>
              </div>
              <div className="d-flex justify-content-center" style={{ color:'#ced4da'}} >
              <div className="fa fa-clock-o fa-2x " aria-hidden="true" style={{margin:"0 0.5rem 0 0.5rem "}}></div>
              <h4>Total: &nbsp;</h4>
              <h4>{this.state.total}</h4>
              </div>
              <div className="d-flex justify-content-center" style={{ color:'#ced4da'}} >
              <div className="fa fa-hourglass-half fa-2x" aria-hidden="true" style={{margin:"0 0.5rem 0 0.5rem "}}></div>
              <h4>Efficiency: &nbsp;</h4>
              <h4 > {` ${(this.state.efficiency)}%`}&nbsp;</h4> 
              {(this.state.efficiency > 85 )? (
                <i className="fa fa-smile-o fa-2x"  style={{color:'green'}} aria-hidden="true"></i>
                ) : (
                <i className="fa fa-frown-o fa-2x" style={{color:'red'}} aria-hidden="true"></i>
                )
              }
              </div>
            </div>
        )
    }

    ReadFromFirebase() {
      let tmpdate = new Date(this.state.dateOne);
      let Day = tmpdate.getFullYear() + '-' + ("0" + (tmpdate.getMonth() + 1)).slice(-2) + '-' + ("0" + (tmpdate.getDate())).slice(-2);
      var starCountRef = firebase.database().ref(Day);
      starCountRef.once('value', (snapshot) => {
        if(snapshot.exists()){
          let tmp_1 = (new Date(snapshot.val().wakeup_time)).getTime() - (new Date(snapshot.val().sleep_time)).getTime();
          let tmp_2 = (new Date(snapshot.val().wakeup_time)).getTime() - (new Date(snapshot.val().InBed)).getTime();
          let Inbed = (snapshot.val().InBed).split(' ')[1]
          let Sleep = (snapshot.val().sleep_time).split(' ')[1]
          let Wake = (snapshot.val().wakeup_time).split(' ')[1]
          let tmp_data = [];
          let pointer = (Number(Sleep.split(":")[0])*60 + Number(Sleep.split(":")[1]))
          if( Number(Inbed.split(":")[0]) > 12 ){
            tmp_data.push({
                y: pointer,
                color:'#a6808c'
            })
          }else{
            tmp_data.push({
              y:(Number(Inbed.split(":")[0])%12)*60 + Number(Inbed.split(":")[1]),
              color:'#706677'
            })
            tmp_data.push({
              y: pointer - ((Number(Inbed.split(":")[0])%12)*60 + Number(Inbed.split(":")[1])),
              color:'#a6808c'
            })
          }

          var move = (snapshot.val().move_2).split(',')
          for(let i=0; i< move.length; i++){
            console.log(i, Number(move[i].split(":")[0])*60 + Number(move[i].split(":")[1]), pointer)
            tmp_data.push({
              y:  Number(move[i].split(":")[0])*60 + Number(move[i].split(":")[1]) - pointer - 1,
              color:'rgb(255,230,167)'
          })
            pointer = Number(move[i].split(":")[0])*60 + Number(move[i].split(":")[1])
            tmp_data.push({
              y: 1,
              // color:'#d6cfcb'
              color: 'rgb(240,113,103)'
            })
          }
          tmp_data.push({
            y: (Number(Wake.split(":")[0])*60 + Number(Wake.split(":")[1])) - pointer,
            // color:'#d6cfcb'
            color: 'rgb(255,230,167)'
          })

          if( Number(Inbed.split(":")[0]) > 12 ){
            tmp_data.push({
              y:   ((Number(Inbed.split(":")[0])%12)*60 + Number(Inbed.split(":")[1])) - (Number(Wake.split(":")[0])*60 + Number(Wake.split(":")[1])),
              color:'#706677'
            })
            tmp_data.push({
              y: 720 - ((Number(Inbed.split(":")[0])%12)*60 + Number(Inbed.split(":")[1])),
              color:'#a6808c'
            })
          }else{
            tmp_data.push({
              y:  720 - ((Number(Wake.split(":")[0])%12)*60 + Number(Wake.split(":")[1])),
              color:'#706677'
            })
          }
          let tmp = (new Date(snapshot.val().wakeup_time)).getTime() - (new Date(snapshot.val().sleep_time)).getTime();
          var minutes = Math.floor((tmp / (1000 * 60)) % 60),
              hours = Math.floor((tmp / (1000 * 60 * 60)) % 24);
              
          this.setState(state => ({
            inbed: Inbed,
            sleep: Sleep,
            awake: Wake,
            move_count:  snapshot.val().move_count,
            total: ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2),
            efficiency: ((tmp_1 / tmp_2) *100).toFixed(2),
            series: {
              type: 'pie',
              name: 'Browser',
              data: tmp_data
            }
        }))
        }else{
          this.setState(state => ({
            inbed: "",
            sleep: "",
            awake: "",
            efficiency: 0,
            series: {
              type: 'pie',
              name: 'Browser',
              data: []
            }
        }))
        }
      });
    }

}