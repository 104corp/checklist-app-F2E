import * as actionTypes from './actions';

const initialState = {
    options: [
        // 新增的範例格式為 {id:1, checked: false, content: "", closed:false, showOption:true}
        // {id:1, checked: false, content: "", closed:false, showOption:true}
    ]
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
          // 新增option
        case actionTypes.APPEND_OPTION: {
            // this.addDataFromServer("請修改");
            return {
                options:[ ...state.options, 
                        {checked: false, content: "請修改", closed:false, showOption:true } ]
            }
        }
          // 切換狀態, 正常/修改option狀態 （id）
        case actionTypes.CHANGE_MODE: {

            console.log(action.id)

            const option = state.options.find( (option) =>  option.id===action.id );
            
            option.showOption ^= true;
        
            const options = [...state.options]
            options[options.indexOf(option)] = option
        
            return {options: options}
        
        }
        // 修改option的內容(同步)    event
        case actionTypes.CHANGE_CONTENT: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = [...state.options]
        
            options[options.indexOf(option)].content = action.event.target.value;
        
            return {options: options}
        
        }
        // 勾選checkbox    event
        case actionTypes.CHANGE_CHECKED: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = Object.assign([], state.options);
            // const options = this.state.options;
            options[options.indexOf(option)].checked = action.event.target.checked;  
            // options[id].checked = event.target.checked;  
        
            return {options: options}
        
        }
        // 刪除option
        case actionTypes.DELETE_OPTION: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = Object.assign([], state.options);
              
            options[options.indexOf(option)].closed = true;
        
            return {options: options}
        
        }

    }

    return state;
}







export default reducer;