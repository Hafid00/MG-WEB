import React, { Component } from "react";

export default class RenderImage extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }
  onClick = e => {
    this.props.onClick(e.target.id, e.target.selected);
    this.setState({ selected: !this.state.selected });
  };
  render() {
    return (
      // <div
      //   className="p-col-fixed"
      //   style={{
      //     width: "70px",
      //     backgroundColor: this.state.selected ? "red" : null,
      //     height: "70px"
      //   }}
      // >
      <img
        id={this.props.item.id}
        src={this.props.item.url}
        alt={this.props.item.url}
        selected={this.state.selected}
        style={{
          "box-shadow": this.state.selected ? "0px 0px 4px 4px red" : null
        }}
        width="70px"
        height="70px"
        hspace="6px"
        vspace="4px"
        onClick={this.onClick}
      />
      // </div>
    );
  }
}
