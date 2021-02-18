import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
import {Button} from 'reactstrap';
import {Helmet} from 'react-helmet';
import './Home.css';
import axios from 'axios';
import Week from 'components/Week.jsx'
import Day from 'components/Day.jsx'


function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn == 'Week' ) {
      return <Week />;
    }
    return <Day />;
}

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            TimePeriod:"Week", // or Day
            name:"John Doe",
            schedule: 2345,
            money: 100,
            user_id:"",
            count: 6789,
            isTrigger: true,
            test : 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleTimePeriod = this.handleTimePeriod.bind(this);
    }


    // componentWillReceiveProps(nextProps) {
    //     console.log('2',nextProps.UserId)
    //     // let url = `${Url}/get/info?user_id?user_id=abdeb059-549a-44cf-9f21-5a3191493bb1`;
    //     axios.get(url).then(res => {
    //         console.log('here',res.data)

    //       this.setState({ 
    //           name:res.data.user_id,
    //           money:res.data.money,
    //         });
    //     })
    // }

    render(){
        return(
            <div className="container home" onClick={this.props.toggle}> 
                <Helmet bodyAttributes={{style: 'background-color :#414141'}}/>
                <div className="text-center my-2" >首頁</div>
                <div className="ttt">
                    <form className=" tabber"> 
                    <label htmlFor="t1">Week</label>
                    <input id="t1" name="food" type="radio" defaultChecked="checked"  onChange={this.handleTimePeriod}/>
                    <label htmlFor="t2">Day</label>
                    <input id="t2" name="food" type="radio"   onChange={this.handleTimePeriod}/>
                    <div className="blob"></div>
                    </form>
                </div>
                {/* <div className="my-4 d-flex justify-content-center text-center">
                    <Button style={{backgroundColor: 'transparent', border:'none', boxShadow:'none'}} onClick={this.handleTimePeriod}>
                        <div style={{fontSize:'30px'}}>{this.state.TimePeriod}</div>
                    </Button>
                </div>
                */}
                <div className="my-4" >
                    <Greeting isLoggedIn={this.state.TimePeriod} />
                </div>
            </div>
        )
    }

    handleTimePeriod(){
        if(this.state.TimePeriod === "Week"){
            this.setState(state => ({
                TimePeriod: "Day"
            }));
        }else{
            this.setState(state => ({
                TimePeriod: "Week"
            }));
        }
    }

    handleClick(){
        this.setState(state => ({
            isTrigger: !state.isTrigger
        }));
    }
}


        
//                {/* <img className="image" src={`images/${this.state.gender}.png`}/>
//                 <div className="info" style={{margin:'0 0 1rem 0'}}>
//                     <h4>Me
//                         <Button style={{backgroundColor: 'transparent', border:'none', width:'1rem', boxShadow:'none'}} onClick={this.handleGender}>
//                             <i className={`fa fa-${this.state.gender}`}></i>
//                         </Button>
//                     </h4>
//                 </div> */}
//                     {/* <div className="px-3 my-3 vert-r"> 
//                         <h3 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>{this.state.schedule}%</h3>
//                         <h6>本周完成進度</h6>
//                     </div>
//                     <div className="px-3">
//                         <h1 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>$&nbsp;{this.state.money}</h1>
//                         <h6>錢包金額</h6>
//                     </div>
//                     <div className="px-3 my-3 vert-l">
//                         <h3 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>{this.state.count}</h3>
//                         <h6> 記憶單字數</h6>
//                     </div> */}
//                 {/* <BarChart  width={400} height={200} data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5,}} barSize={20}> 
//                     <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
//                 </BarChart> */}
                
//                 {/* <h1>{this.state.test}</h1> */}
// {/*
//                 <Link className="d-flex my-2 mx-auto btn" to="/MissionList"> 
//                     <Button style={{backgroundColor: '#FF6347',border:'none'}} block onClick={this.handleClick}>
//                         <h6>開始今日任務</h6>
//                     </Button>
//                 </Link>
// */}