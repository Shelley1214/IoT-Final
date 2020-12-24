import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'
import {Button} from 'reactstrap';
import {Helmet} from 'react-helmet';
import {
  BarChart, Bar, XAxis, CartesianGrid
} from 'recharts';
import './Home.css';
import axios from 'axios';

const Url = 'http://140.114.87.70:3000/api';

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            intro: "Hi! My name is John, I'm a creative geek from San Francisco, CA. Contact me at john@mail.com",
            gender:"venus", // or mars
            name:"John Doe",
            schedule: 2345,
            money: 100,
            user_id:"",
            count: 6789,
            isTrigger: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleGender = this.handleGender.bind(this);
    }


    componentDidMount() {
        console.log('1',this.props.UserId)
        let url = `${Url}/get/info?user_id?user_id=abdeb059-549a-44cf-9f21-5a3191493bb1`;
        axios.get(url).then(res => {
          this.setState({ 
              name:res.data.user_id,
              money:res.data.money,
            });
        })
    }

    componentWillReceiveProps(nextProps) {

        console.log('2',nextProps.UserId)
        let url = `${Url}/get/info?user_id?user_id=abdeb059-549a-44cf-9f21-5a3191493bb1`;
        // let url = `${Url}/get/info?user_id?user_id=${this.props.UserId}`;
        axios.get(url).then(res => {
            console.log('here',res.data)

          this.setState({ 
              name:res.data.user_id,
              money:res.data.money,
            });
        })
    }

    render(){
        const data = [
            {name: 'Day 1', pv: 2400},
            {name: 'Day 2', pv: 1398},
            {name: 'Day 3', pv: 9800},
            {name: 'Day 4', pv: 3908},
            {name: 'Day 5', pv: 4800},
            {name: 'Day 6', pv: 3800},
            {name: 'Day 7', pv: 4300},
        ];

        return(
            <div className="container home" onClick={this.props.toggle}> 
                <Helmet bodyAttributes={{style: 'background-color :#414141'}}/>
                <div className="text-center my-2" >首頁</div>
                <img className="image" src={`images/${this.state.gender}.png`}/>
                <div className="info" style={{margin:'0 0 1rem 0'}}>
                    <h4>Me
                        <Button style={{backgroundColor: 'transparent', border:'none', width:'1rem', boxShadow:'none'}} onClick={this.handleGender}>
                            <i className={`fa fa-${this.state.gender}`}></i>
                        </Button>
                    </h4>
                    <h6>{this.state.name}</h6>
                </div>
                <p className="info">{this.state.intro}</p>
                <div className="my-4 d-flex justify-content-center text-center">
                    <div className="px-3 my-3 vert-r"> 
                        <h3 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>{this.state.schedule}%</h3>
                        <h6>本周完成進度</h6>
                    </div>
                    <div className="px-3">
                        <h1 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>$&nbsp;{this.state.money}</h1>
                        <h6>錢包金額</h6>
                    </div>
                    <div className="px-3 my-3 vert-l">
                        <h3 style={{fontFamily:'Waiting for the Sunrise, cursive'}}>{this.state.count}</h3>
                        <h6> 記憶單字數</h6>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <BarChart  width={400} height={200} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5,}} barSize={20}> 
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
                </div>
{/*
                <Link className="d-flex my-2 mx-auto btn" to="/MissionList"> 
                    <Button style={{backgroundColor: '#FF6347',border:'none'}} block onClick={this.handleClick}>
                        <h6>開始今日任務</h6>
                    </Button>
                </Link>
*/}
            </div>
        )
    }

    handleGender(){

        if(this.state.gender === "venus"){
            this.setState(state => ({
                gender: "mars"
            }));
        }else{
            this.setState(state => ({
                gender: "venus"
            }));
        }
    }

    handleClick(){
        this.setState(state => ({
            isTrigger: !state.isTrigger
        }));
    }
}