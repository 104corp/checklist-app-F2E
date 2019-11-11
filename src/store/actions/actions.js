import * as actionTypes from './actionTypes';
import * as address from '../../config/address';

const ERROR_MESSAGE_FROM_SERVER = '伺服器取得資料失敗';

const APPEND_OPTION = {
    sendText: '請修改',
    duplicated: -2,
    sizeOutOfBound: -1
}

const CHANGE_MODE = {
    duplicated: 0,
    unique: 1
}

const DELETE_OPTION = {
    notExist: -1,
    unfinished: 0,
    deleted: 1
    
}

export const setChecklist = (initOptions) => {
    return {
        type: actionTypes.SET_CHECKLIST,
        options: initOptions
    }
}

export const saveOption = (text, id) => {
    return {
        type: actionTypes.APPEND_OPTION,
        text: text,
        id: id
    }
}

export const setMode = (id) => {
    return {
        type: actionTypes.CHANGE_MODE,
        id: id
    }
}

export const setERROR = () => {
    return {
        type: actionTypes.ERROR,
    }
}

export const setDeleteOption = (id) => {
    return {
        type: actionTypes.DELETE_OPTION,
        id: id
    }
}

//get data from server
export const initChecklist = () => {

    return dispatch => {

        let initOptions = null;

        fetch( address.server + '/test/GET', {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then((optionList) => {
            // add attrbute of each option
            const options = optionList.map((option) => {
                let trimedOption = { id: option.itemId, checked: option.state, content: option.content, closed:false, showOption:true }
                console.log('Id: '+ option.itemId )
                return {...initOptions, ...trimedOption} 
            })     
            initOptions = {options}
            return dispatch(setChecklist(initOptions));
        })
        .catch((error) => {
            alert(ERROR_MESSAGE_FROM_SERVER)
            console.error(error)
        })
    }
}

//update data from server
export const updateChecklist = (payload) => {

    fetch( address.server + '/UPDATE', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    })
    .catch((error) => {
        alert(ERROR_MESSAGE_FROM_SERVER)
        console.error(error)
    })

    return {
        type: actionTypes.UPDATE_CHECKLIST
    }
}

export const appendOption = () => {

    const id = Math.floor(Math.random() * Math.floor(99999))
    return dispatch => {
        
        fetch( address.server + '/test/PUT', {
            method: 'PUT',
            body: APPEND_OPTION.sendText+id
        })
         .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
         })
        .then((text) => {
            switch(text) {
                case APPEND_OPTION.duplicated: {
                    alert('有內容重複')
                    return dispatch(setERROR())
                }
                case APPEND_OPTION.sizeOutOfBound: {
                    alert('新增內容超過10個')
                return dispatch(setERROR())
                }
                default: {
                    console.log("id:"+text +" added")
                    return dispatch(saveOption(APPEND_OPTION.sendText, id))    
                }
            }

        })
        .catch((error) => {
            alert(ERROR_MESSAGE_FROM_SERVER)
            console.error(error)
        })
        
    }

}

export const changeMode = (id, content, checked) => {

    const payload = {
        "ItemId": id,
        "State": checked ? 1 : 0,
        "content": content
    }

    console.log(payload)

    return dispatch => {
        fetch( address.server + '/test/UPDATE', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) 
        })
        .then((response) => {  
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then((receiveStatus) => {
            console.log("我得到的資料："+receiveStatus)
            switch(receiveStatus){

                case CHANGE_MODE.unique: {    
                    return dispatch(setMode(id))     
                } 
                case CHANGE_MODE.duplicated: {
                    alert('資料已重複')
                    return dispatch(setERROR())
                }
                default: {
                    return dispatch(setERROR())
                }

            }
                
        })
        .catch((error) => {
            alert(ERROR_MESSAGE_FROM_SERVER)
            console.error(error)
        })
    } 
    
}

export const deleteOption = (id) => {

    return dispatch => {
        fetch( address.server + '/test/DEL/' + id, {
            method: 'POST',
        })
        .then((response) => {

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json()
        })
        .then((status) => {
            //-1不存在     0未完成     1已刪除
            switch(status) {
                case DELETE_OPTION.deleted: {
                    // alert('已刪除這個項目')
                    return dispatch(setDeleteOption(id))
                }
                case DELETE_OPTION.notExist: {
                    alert('這個項目不存在')
                    return dispatch(setERROR())
                }
                case DELETE_OPTION.unfinished: {
                    alert('未完成的項目無法刪除')
                    return dispatch(setERROR())
                }
                default: {
                    return dispatch(setERROR())
                }
            }
        })
        .catch((error) => {
            alert(ERROR_MESSAGE_FROM_SERVER)
            console.error(error)
        })
    }

}

export const changeContent = (id, event) => {

    const payload = {
        "ItemId": id,
        "content": event.target.value
    }

    fetch( address.server + '/test/UPDATE', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
     })
    .then((response) => {

        if (!response.ok) {
            throw new Error(response.statusText)
        }

    })
    .catch((error) => {
        alert(ERROR_MESSAGE_FROM_SERVER)
        console.error(error)
    })

    return {
        type: actionTypes.CHANGE_CONTENT,
        id: id,
        event: event
    }
}

export const changeChecked = (id, event) => {

    const payload = {
        "ItemId": id,
        "State": event.target.checked ? 1 : 0
    }
    // console.log("勾選狀態："+event.target.checked)

    fetch( address.server + '/test/UPDATE', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
    })
    .then((response) => {
        console.log(response)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    })
    .catch((error) => {
        alert(ERROR_MESSAGE_FROM_SERVER)
        console.error(error)
    })

    return {
        type: actionTypes.CHANGE_CHECKED,
        id: id,
        event: event
    }
}
