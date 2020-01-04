import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PopUp extends Component {
  handleChild = (e) => {
    e.stopPropagation();
  }

  render() {
    const { isOpen, closePopUp, children } = this.props;
    return (
      isOpen &&
      <div
        onClick={closePopUp}
        className="popUp"
        style={{ top: '0px' }}
      >
        <div
          onClick={this.handleChild}
        >
          <div style={{ display: 'flex', padding: '10px', background: 'white', width: '40%', height: '30%', top: '25%', borderRadius: '30px', position: 'absolute', left: '25%' }}>
            <span
              role="button"
              onClick={closePopUp}
              tabIndex="0"
              className="popUp1"
              style={{ color: 'black', cursor: 'pointer' }}
            >
            X
            </span>
          {children}
        </div>
        </div>
      </div>
    );
  }
}

PopUp.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.instanceOf(Object),
  closePopUp: PropTypes.func.isRequired,
  classes: PropTypes.string
};

PopUp.defaultProps = {
  isOpen: false,
  children: null,
  classes: '',
  closePopUp: f => f,
};


export default PopUp;
