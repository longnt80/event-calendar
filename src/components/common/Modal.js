import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  left: 50%;
  min-height: 100px;
  min-width: 200px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: ${props => props.open ? "visible" : "hidden"};
  box-shadow: 0 6px 12px 6px rgba(0, 0, 0, 0.175);
  background-color: #fff;
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    document.body.addEventListener('click', this._handleClickOnDocument);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  _handleClickOnDocument = (e) => {
    const target = e.target;
    if (!this.el.contains(target)) {
      this.props.closeModal();
    }
  }

  renderDefaultElements = () => {
    return (
      <Wrapper open={this.props.open}>
        {this.props.children}
      </Wrapper>
    )
  }

  render() {
    if (!this.props.open) {
      return null;
    }

    return ReactDOM.createPortal(
      this.renderDefaultElements(),
      this.el
    )
  }
}

export default Modal;
