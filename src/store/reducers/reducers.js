import * as actionTypes from '../actions/actionTypes';

const initialState = {
    options: [
        // Example: {id:1, checked: false, content: "", closed:false, showOption:true}
    ]
}

const reducer = (state = initialState, action) => {

    let payload = action.options
    switch(action.type) {

          // add option.
        case actionTypes.APPEND_OPTION: {
            return {
                ...state,
                options:[ ...state.options, 
                        {id: action.id, checked: false, content: action.text+action.id, closed:false, showOption:true } ]
            }
        }
          // change status, Normal/Modified status.
        case actionTypes.CHANGE_MODE: {

            const option = state.options.find( (option) =>  option.id===action.id );
            option.showOption ^= true;
            const options = [...state.options]
            options[options.indexOf(option)] = option
            return {...state, options: options}
        
        }
        // modify option content.    
        case actionTypes.CHANGE_CONTENT: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = [...state.options]
            options[options.indexOf(option)].content = action.event.target.value;
            return {...state, options: options}
        
        }
        // interact with checkbox.    
        case actionTypes.CHANGE_CHECKED: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = Object.assign([], state.options);
            options[options.indexOf(option)].checked = action.event.target.checked;   
            return {...state, options: options}
        
        }
        // delete option.
        case actionTypes.DELETE_OPTION: {

            const option = state.options.find( (option) =>  option.id===action.id );
            const options = Object.assign([], state.options);             
            options[options.indexOf(option)].closed = true;       
            return {...state, options: options}
        
        }
        // update checklist.
        case actionTypes.SET_CHECKLIST: {
            return {...state, ...payload}     
        }

        default: {
            return state;
        }

    }

}

export default reducer;