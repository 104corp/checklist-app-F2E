import React from 'react';
import { MDBBtn } from "mdbreact";
import "../../css/Option.sass";

const Option = ( props ) => {
    
    // This option will be render.
    let option = null;

    // Decoration line style.
    const textStyle = props.checked === true ? {
        textDecorationLine: 'line-through',
    } : null;

    if( props.closed ) {
        // Delete option status.
        option = ( null )

    }else if( props.showOption ) {
        // Normal status.
        option = (
            <div>
                <input className="checkbox" type="checkbox" checked={props.checked} onChange={props.changeChecked} />
                <div className="text" style={textStyle}>{props.content}</div>
                <MDBBtn className="modify" color="info" size="sm" onClick={props.changeMode}>修改</MDBBtn>
                <MDBBtn className="delete" color="danger" size="sm" onClick={props.deleteOption}>刪除</MDBBtn>
                <div className="action"></div>
            </div>
        );

    }else if( !props.showOption ) {
        // modified status.
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