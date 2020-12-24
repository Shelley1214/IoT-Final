import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {Button, Container, ListGroup, ListGroupItem} from 'reactstrap';
import { Helmet } from 'react-helmet';
import './setting.css';


export default class Setting extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            name: "John Doe",
            email:"john.doe@mail.com",
            notice: "On"
        };
    }

    handleNameChange = evt => {
        this.setState({ name: evt.target.value });
    };

    handleMailChange = evt => {
        this.setState({ email: evt.target.value});
    };

    handleChange = evt => {
        this.setState({notice: evt.target.value});
      }
      
    render(){
        return(
             // onClick={this.props.toggle}
            <div className="container home" onClick={this.props.toggle}>
                <div className="text-center my-2" >設定</div>
                <Helmet bodyAttributes={{style: 'background-color :#414141'}}/>
                <ListGroup className="list-group-flush" style={{color:'black'}}>
                    <ListGroupItem className="my-2">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <p className="word">&nbsp;&nbsp;我</p>
                        <input type="text" className="change" value={this.state.name} onChange={this.handleNameChange}/>

                    </ListGroupItem>
                    <ListGroupItem className="my-2">
                        <i className="fa fa-bell " style={{textAlign:'left', fontSize:'13.72px'}}aria-hidden="true"></i>
                        <p className="word">&nbsp;&nbsp;通知</p>
                        <select className="change" value={this.state.notice} onChange={this.handleChange}>
                            <option value="On">On</option>
                            <option value="Off">Off</option>
                        </select>
                    </ListGroupItem>
                    <Link to="/Setting" style={{textDecoration:'none'}}>
                        <button className="my-2 setting">
                            <i className="fa fa-gear " style={{color:'black'}} aria-hidden="true"></i>
                            <p className="word">&nbsp;&nbsp;一般</p>
                        </button>
                    </Link>
                    <ListGroupItem className="my-2">
                        <i className="fa fa-user " aria-hidden="true"></i>
                        <p className="word">&nbsp;&nbsp;帳號</p>
                        <input type="text" className="change" value={this.state.email} onChange={this.handleMailChange} />
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}