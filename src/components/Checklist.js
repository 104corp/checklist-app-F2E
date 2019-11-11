import React, { PureComponent } from "react";
import { MDBBtn } from "mdbreact";
import Options from "./options/Options.js";
import "../css/Checklist.sass";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actions';

class Checklist extends PureComponent {

  state = {
    // 新增的範例格式為 {id:1, checked: false, content: "", closed:false, showOption:true}
    options:[]
  };

componentDidMount() {
  this.props.initChecklist();
}

  render() {
    return (
      <div className="main-content">
          {/* 標題 */}
          <div className="top">
            <div className="title">Checklist</div>
            <MDBBtn color="primary" className="add-option" onClick={() => this.props.appendOption()}>新增選項</MDBBtn>
          </div>
          {/* 所有Options */}
          <Options 
            options = {this.props.options}
            click = { this.props.changeChecked }
            deleteOption = { this.props.deleteOption }
            changeContent = { this.props.changeContent } 
            changeMode = { this.props.changeMode }
            changeChecked = { this.props.changeChecked }
          />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      options: state.options
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appendOption: () => dispatch(actionCreators.appendOption()),
    changeMode: (id, content, checked) => dispatch(actionCreators.changeMode(id, content, checked)),
    deleteOption: (id) => dispatch(actionCreators.deleteOption(id)),
    changeContent: (id, event) => dispatch(actionCreators.changeContent(id, event)),
    changeChecked: (id, event) => dispatch(actionCreators.changeChecked(id, event)),
    initChecklist: () => dispatch(actionCreators.initChecklist()),


  };
};

// export default Checklist;
export default connect(mapStateToProps, mapDispatchToProps)(Checklist);