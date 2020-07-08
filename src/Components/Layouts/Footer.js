import React, { Component } from "react";
import {Paper,Tabs,Tab} from '@material-ui/core';

class Footer extends Component {
  render() {
    const index = this.props.category ? this.props.lists.findIndex(list => list===this.props.category)+1:0
    return (
      <Paper >
      <Tabs
        value={index}
        onChange = {(e,index)=>{
          this.props.onSelect(index===0?'':this.props.lists[index-1])
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
      <Tab label = "All"/>
      {this.props.lists.map(list =>
        <Tab label={list} />
      )}
      </Tabs>
    </Paper>
    );
  }
}

export default Footer;
