import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Route } from 'react-router-dom';

export default class SideBtn extends React.Component {
    static propTypes = {
        toggle: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render(){
        const{toggle} = this.props;
        return(
            <div className="d-flex sidebar-icon"> 
                <div style={{position:"absolute"}}>
                    <Button color="link" style={{color: '#FF6347'}} onClick={toggle}>
                    <i className="fa fa-align-left" aria-hidden="true"></i>
                    </Button>
                </div>
            </div>
        )
    }
}
