import React, { PureComponent } from "react";
import { MDBBtn } from "mdbreact";
import Options from "./options/Options.js";
import "../css/Checklist.sass";
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
class Checklist extends PureComponent {

  state = {
    options:[
      // 新增的範例格式為 {id:1, checked: false, content: "", closed:false, showOption:true}
      // {id:1, checked: false, content: "", closed:false, showOption:true}
    ]
  };

  constructor(props){
    super(props);
}

componentDidMount() {
  // this.props.getDataFromServer(state)
  this.getDataFromServer(this.state);

}

// {"State":"0","ItemId":"1","content":"a"}
// https://jsonplaceholder.typicode.com/
getDataFromServer = (state) => {
  console.log("handleServerItemsLoad called")
  fetch('http://10.102.250.198/GET', {
    method: 'GET',
    // mode: 'CORS'  //CORS problem
    })
    .then((response) => {
      //ok 代表狀態碼在範圍 200-299
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((optionList) => {

       //加入屬性
       const options = optionList.map((option) => {
         console.log(option.ItemId)
         return Object.assign({}, option, {id: option.ItemId, checked: option.State, content: option.content, closed:false, showOption:true})
       })
      
       //往後加
       state.options.push(...options)

      //載入資料，重新渲染
      this.setState({state})

    })
    .catch((error) => {
      //這裡可以顯示一些訊息
      console.error(error)
    })
}

updateDataFromServer = (payload) => {
  console.log("updateDataFromServer called")
  console.log(payload)
  //作POST
  fetch('http://10.102.250.198/UPDATE', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
   })
    .then((response) => {
      console.log(response)
      //ok 代表狀態碼在範圍 200-299
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .catch((error) => {
      //這裡可以顯示一些訊息
      //console.error(error)
    })
}

deleteDataFromServer = (id) => {
  console.log("deleteDataFromServer called")
  console.log(id)
  //作POST
  fetch('http://10.102.250.198/DEL/'+id, {
    method: 'DELETE',
   })
    .then((response) => {
      console.log(response)
      //ok 代表狀態碼在範圍 200-299
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .catch((error) => {
      //這裡可以顯示一些訊息
      //console.error(error)
    })
}

addDataFromServer = (text) => {
  console.log("addDataFromServer called")
  fetch('http://10.102.250.198/PUT', {
    method: 'PUT',
    body: text
    })
    .then((response) => {
      //ok 代表狀態碼在範圍 200-299
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((text) => {
      console.log("id:"+text +" added")
    })
    .catch((error) => {
      //這裡可以顯示一些訊息
      console.error(error)
    })
}



  // changeCheckedHandler = (event, id) => {
  //   const option = this.state.options.find( (option) =>  option.id===id );
  //   const options = Object.assign([], this.state.options);

  //   options[options.indexOf(option)].checked = event.target.checked;  


  //   this.setState({options: options})


  //   const payload = {
  //     State: "" + (event.target.checked ? "1" : "0" ),
  //     ItemId: "" + id,
  //     content: options[options.indexOf(option)].content
  //   }
    
  //   this.updateDataFromServer(payload);
    
  // }


  // changeClosedHandler = (id) => {

  //   const option = this.state.options.find( (option) =>  option.id===id );
  //   const options = Object.assign([], this.state.options);
      
  //   options[options.indexOf(option)].closed = true;

  //   this.setState({options: options})

  //   this.deleteDataFromServer(id)
  // }


  // changeContentHandler = (event, id) => {

  //   const option = this.state.options.find( (option) =>  option.id===id );
  //   const options = [...this.state.options]

  //   options[options.indexOf(option)].content = event.target.value;

  //   this.setState({options: options})

  // }


  // changeShowOptionHandler = (id) => {
  //   console.log(id)

  //   const option = this.state.options.find( (option) =>  option.id===id );
    
  //   option.showOption ^= true;

  //   const options = [...this.state.options]
  //   options[options.indexOf(option)] = option

  //   this.setState({options: options})   

  //   if(option.showOption == true) {

  //     const payload = {
  //       State: "" + (options[options.indexOf(option)].checked ? "1" : "0" ),
  //       ItemId: "" + id,
  //       content: options[options.indexOf(option)].content
  //     }

  //     this.updateDataFromServer(payload);
  //   }

  // }


  // appendOption = () => {

  //   this.setState({
  //     options:[ ...this.state.options, 
  //               {checked: false, content: "請修改", closed:false, showOption:true } ]
  //   })

  //     this.addDataFromServer("請修改");

  // }

  render() {
    
    return (
      <div className="main-content">

          {/* 標題 */}
          <div className="top">
            <div className="title">Checklist</div>
            <MDBBtn color="primary" className="add-option" onClick={this.appendOption}>新增選項</MDBBtn>
          </div>

          {/* 所有Options */}
          <Options 
            options = {this.state.options}
            click = { this.changeChecked }
            deleteOption = { this.deleteOption }
            changeContent = { this.changeContent } 
            changeMode = { this.changeMode }
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
    appendOption: () => dispatch({type: actionTypes.APPEND_OPTION}),
    changeMode: (id) => dispatch({type: actionTypes.CHANGE_MODE, id: id}),
    deleteOption: (id) => dispatch({type: actionTypes.DELETE_OPTION, id: id}),
    changeContent: (id, event) => dispatch({type: actionTypes.CHANGE_CONTENT, id: id, event: event}),
    changeChecked: (id, event) => dispatch({type: actionTypes.CHANGE_CHECKED, id: id, event: event})
    
  };
};

// export default Checklist;
export default connect(mapStateToProps, mapDispatchToProps)(Checklist);


