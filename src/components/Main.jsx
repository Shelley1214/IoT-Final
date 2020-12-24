import React, {useState} from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import SideBar from 'components/SideBar.jsx';
import Content from 'components/Content.jsx';
import './Main.css';


export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false,
            userInfo: {
                userId: "",
                money: 0,
                ok_code: 0,
                userName: ""
            },
        };
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleWholeToggle = this.handleWholeToggle.bind(this);
        this.handleUserId = this.handleUserId.bind(this);
    }

    render(){
        return (
            <Router>
                <div className="main">
                    <SideBar className="sidebar" toggle={this.handleNavbarToggle} isOpen={this.state.navbarToggle} />
                    <Content toggle={this.handleNavbarToggle} OpenStretch={this.handleWholeToggle} IdFunc={this.handleUserId} UserInfo={this.state.userInfo}/>
                </div>
            </Router>
            );
    }
    
    handleUserId(Id){
        console.log('get UserId')
        this.setState(() => ({
            userInfo:{
                userId: Id,
            }
        }));
    }

    handleWholeToggle(){
        console.log("run")
        if(this.state.navbarToggle == true){
            this.setState((prevState, props) => ({
                navbarToggle: !prevState.navbarToggle
            }));
        }
    }
    
    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

}

