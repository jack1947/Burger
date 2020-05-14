import React, { Component } from "react";

import Aux from "../../../hoc/Aux";
import classes from "./Modal.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.show !== nextProps.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.hideModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "trasitionY(0)" : "transitionY(-100)",
            top: this.props.show ? "25%" : "-300%",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
