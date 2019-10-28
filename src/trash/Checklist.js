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
  MDBBtn
} from "mdbreact";
import Option from "./Option.js/index.js";
import ButtonContext from "../context/Button-context.js";
import "../css/Checklist.sass";

class Checklist extends Component {

    constructor(props){
        super(props);
        this.state = {

            options: [
                // { id: '0', text: '待編輯'}
            ],
            id: [0],
            size: 0
        };
    }

    appendOption = () => {

        this.setState(
            state => ({
            options: [
                ...state.options,
                { id: '0', text: '待編輯'}
            ],
            id: [
                ...state.id,
                state.size+1
            ],
            size: state.size+1
            }) 
        );

        // this.setState({
        //     options: [
        //         ...state.options,
        //         { id: '0', text: '待編輯'}
        //     ]
        // });

        //this.state = {ddddd}

        console.log(this.state.id)

    }

    deletePersonHandler = ( personIndex ) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice( personIndex, 1 );
        this.setState( { persons: persons } );
      }

  render() {
    return (
      <div className="main-content">
          <div className="top">
            <img className="icon" />
            <div className="title">Checklist</div>
            <MDBBtn color="primary" className="add-option" onClick={() => this.appendOption()}>新增選項</MDBBtn>
            {/* <input className="remove-list"></input> */}
          </div>

            {/* 進度條 */}
          <div className="bar"></div>
          
          {/* <ButtonContext.Provider> */}
          <div className="list-container">
                    {/* {this.state.options.map( (option) => option )} */}
                    {this.state.options.map( (option, i) => 
                    <Option 
                        className="option"
                        isDone = {false} 
                        key={i}
                        text={this.state.options[i].text}
                    />
                )}
          </div>

      </div>
    );
  }
}

export default Checklist;