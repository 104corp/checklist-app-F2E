import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBInput,
  MDBBtn
} from "mdbreact";
import "../css/Option.sass";

class Option extends Component {
/*
props:
isDone
*/
    state = {
        isDone: false,
        text: this.props.text,
        showOption: true,
        isClose: false
    }

    constructor(props){
        super(props);
    }

    changeStatusHandler = (event) => {
        let check = event.target.checked;
        if(check==true){

            this.setState(
                state => ({
                    isDone: true
                })
            )

        }else{
            this.setState(
                state => ({
                    isDone: false
                })
            )
        }
    }

    changeTextHandler = (event) => {
        if(this.state.showOption == true){
            this.setState({
                showOption: false
              });
        }else{
            this.setState({
                showOption: true
              });
        }
        
    }

    handleChange = (event) => {
        this.setState({
          text: event.target.value
        });
    }

    deleteHandler = (event) => {
        this.setState({
            isClose: true
          });
    }


  render() {

    const textStyle = this.state.isDone == true ? {
        textDecorationLine: 'line-through',
    } :null;
    
    if(this.state.isClose){
        return null
    }

    return (
      <div className="main-content">

        { this.state.showOption ? 
            <div>
                <input className="checkbox" type="checkbox" onChange={this.changeStatusHandler} />
                <div className="text" style={textStyle}>{this.props.text}</div>
                <MDBBtn className="modify" color="info" className="add-option" size="sm" onClick={this.changeTextHandler.bind(this)}>修改</MDBBtn>
                <MDBBtn className="delete" color="danger" className="add-option" size="sm" onClick={this.deleteHandler.bind(this)}>刪除</MDBBtn>
                <div className="action"></div>
            </div>
            : 
            <div>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    value={this.props.text}
                    onChange={this.handleChange.bind(this)}
                />
                <MDBBtn color="info" className="add-option" onClick={this.changeTextHandler.bind(this)}>送出</MDBBtn>

            </div>

            


        }

      </div>
    );
  }
}

export default Option;