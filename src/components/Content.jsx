import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Home from 'components/Home.jsx';
import Intro from 'components/intro.jsx';
import SideBtn from 'components/ShowSideBtn.jsx'
import Setting from 'components/setting.jsx'
import "./Content.css"

export default class Content extends React.Component {
    static propTypes = {
        toggle: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render(){
        const{ toggle} = this.props;
        const style = {
            paddingRight: '0px',
            paddingLeft: '0px'
          };
        return(
            <div className={`content_ `}>

                <Route exact path="/" render={() => (
                            <Intro IdFunc={this.props.IdFunc} />
                        )} />
                <Route exact path="/home" render={() => (
                            <div>
                                <SideBtn toggle={toggle}/>
                                <Home UserId={this.props.UserInfo} toggle={this.props.OpenStretch}/>
                            </div>
                        )} />
              
                <Route exact path="/Setting" render={() => (
                    <div>
                        <SideBtn toggle={toggle}/>
                        <Setting toggle={this.props.OpenStretch}/>
                    </div>
                )} />
            </div>
        )
    }
}
