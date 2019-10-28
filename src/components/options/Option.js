import React from 'react';
import { MDBBtn } from "mdbreact";
import "../../css/Option.sass";

const Option = ( props ) => {
    
    // render option
    let option = null;

    // Decoration line style
    const textStyle = props.checked == true ? {
        textDecorationLine: 'line-through',
    } : null;

    if( props.closed ) {
        // Delete option
        option = ( null )

    }else if( props.showOption ) {
        /* 正常模式 */
        option = (
          
            <div>
                <input className="checkbox" type="checkbox" checked={props.checked} onChange={props.click} />
                <div className="text" style={textStyle}>{props.content}</div>
                <MDBBtn className="modify" color="info" className="add-option" size="sm" onClick={props.changeMode}>修改</MDBBtn>
                <MDBBtn className="delete" color="danger" className="add-option" size="sm" onClick={props.deleteOption}>刪除</MDBBtn>
                <div className="action"></div>
            </div>

        );

    }else if( !props.showOption ) {
        /* 修改中模式 */
        option = (
        
            <div>
                <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    value={props.content}
                    onChange={props.changeContent}
                />
                <MDBBtn color="info" className="add-option" onClick={props.changeMode}>送出</MDBBtn>
            </div>

        );

    }
        
    return (
        
        <div className="main-option" >
            { option }       
        </div>

    )
};

export default Option;