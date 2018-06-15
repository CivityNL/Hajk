import React, { Component } from "react";
import Observer from "react-event-observer";
import DrawModel from "./model.js";
//import {createPortal} from 'react-dom';

class Draw extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggled: false
    };
  }

  componentDidMount() {
    this.observer = Observer();
    this.observer.subscribe("myEvent", message => {
      console.log(message);
    });
    this.drawModel = new DrawModel({
      map: this.props.tool.map,
      app: this.props.tool.app,
      observer: this.observer
    });
    this.props.tool.instance = this;
  }

  open() {
    this.setState({
      toggled: true
    });
  }

  close() {
    this.setState({
      toggled: false
    });
  }

  minimize() {
    this.setState({
      toggled: false
    });
  }

  toggle() {
    this.setState({
      toggled: !this.state.toggled
    });
    this.props.tool.app.togglePlugin("draw");
  }

  getActiveClass() {
    return this.state.toggled
      ? "tool-toggle-button active"
      : "tool-toggle-button";
  }

  getVisibilityClass() {
    return this.state.toggled ? "tool-panel" : "tool-panel hidden";
  }

  render() {
    return (
      <div>
        <div className={this.getActiveClass()} onClick={this.toggle}>
          Draw tool
        </div>
        <div className={this.getVisibilityClass()}>
          <div>Rita linje</div>
          <div>Rita yte</div>
          <div>Rita text</div>
        </div>
      </div>
    );
  }
}

export default Draw;