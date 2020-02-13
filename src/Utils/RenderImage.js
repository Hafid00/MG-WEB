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
      <img
        id={this.props.item.id}
        src={this.props.item.url}
        alt={this.props.item.url}
        selected={this.state.selected}
        style={{
          "box-shadow": this.state.selected ? "0px 0px 6px 6px #174237" : null,
          "border-radius": "10%",
          opacity: this.state.selected ? "0.8" : null
        }}
        width="77px"
        height="77px"
        hspace="8px"
        vspace="8px"
        onClick={this.onClick}
      ></img>
    );
  }
}
