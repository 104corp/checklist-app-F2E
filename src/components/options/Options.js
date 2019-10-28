import React, { Component } from "react";
import Option from "./Option.js";
import "../../css/Checklist.sass";

class Options extends Component {
    
    render() {

        return(
            // 放置多個option的table
            <div className="list-container">
                    {/* 列出所有options */}
                    {this.props.options.map( (option) => 
                      <Option 
                          className="option"
                          key={option.id}
                          checked = {option.checked}
                          content = {option.content}
                          closed = {option.closed}
                          showOption = {option.showOption}
                          click = { (event) => this.props.click(event, option.id) }
                          deleteOption = { () => this.props.deleteOption(option.id) }
                          changeContent = { (event) => this.props.changeContent(event, option.id) } 
                          changeMode = { () => this.props.changeMode(option.id) }
                      />
                    )}

          </div>
        );
    }
}

export default Options;