import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Button, Container} from 'reactstrap';
import { Helmet } from 'react-helmet';
import ReactCanvasNest from 'react-canvas-nest';
import { withRouter } from 'react-router-dom';

function validate(user=[], password=[]) {
    return {
      user: user.length === 0,
      // password: password.length === 0,
    };
  }
  
class Intro extends React.Component {
    static propTypes = {
        IdFunc: PropTypes.func,
    };

    constructor(props) {
        super(props);
    
        this.state = {
            user:"",
            password:"",
        };
        this.click = this.click.bind(this);

    }

    handleChange = evt => {
        this.setState({ user: evt.target.value});
    };    
    
    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value});
    };
    
    click(user, password) {
        
        // axios.get(url).then(function(res) {
        //     if(res.data.ok_code){
        //         that.props.history.push("/Home");
        //         const ID = res.data.user_id
        //         const name = res.data.user_name
        //         const money = res.data.money
        //         that.props.IdFunc(ID, name, money)
        //         console.log('Intro is sending get/user api:', res)
        //     }else{
        //         that.props.history.push("/");
        //         that.setState({
        //             password:"",
        //             user:"",
        //         });
        //         alert("Wrong!");

        //     }
        // }).catch((err) => {
        //     console.log(err)
        // });
    }

    render(){
        return(

            <div className="text-center container"style={{top:"25%"}} >
                <Helmet bodyAttributes={{style: 'background-color :#414141'}}/>
                <ReactCanvasNest />
                <div className="container my-4" >
                    <h1  style={{overflow:'hidden', fontFamily:'Love Ya Like A Sister, cursive' ,fontSize:'70px'}}> Sleep </h1>
                    <h1  style={{overflow:'hidden', fontFamily:'Love Ya Like A Sister, cursive' ,fontSize:'70px'}}> Tracker </h1>
                <Link  style={{padding:'0', border:'none', textDecoration:'none'}} to="/Home"> 
                    <div className="d-flex my-2 mx-auto btn">
                    <Button  onClick={event => this.click(this.state.user)} style={{ backgroundColor: '#FF6347',border:'none',margin:'0', padding:'0'}} block >
                        開始
                    </Button>
                    </div>
                </Link>
                </div>
               {/* <Container className="py-2 my-2" style={{ width:'75%',color: 'black', background:'#F0F0F0', textAlign:'center',borderRadius:'5px'}}> */}
                {/* <h2>登入</h2> */}
                {/* <input
                type="text" placeholder="UserName" value={this.state.user} style={{borderRadius:'5px',display:'block',width:'50%',fontSize:'20px', margin:'1rem auto'}}
                onChange={this.handleChange}
                /> */}
                {/* <input
                type="password" placeholder="Password" value={this.state.password} style={{borderRadius:'5px',display:'block',width:'50%',fontSize:'20px', margin:'1rem auto'}}
                onChange={this.handlePasswordChange}
                /> */}
                {/* </Container> */}
                {/* <Link to="/Create">Create Account</Link> */}
            </div>
        )
    }
}

export default withRouter(Intro);