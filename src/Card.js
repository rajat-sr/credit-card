import React, { Component } from 'react'

class Card extends Component {
  isInvalid(input) {
    return input === null || input === undefined || input === '';
  }
  
  render () {
    const { card, name, expiry, cvv } = this.props;
    return (
      <div>
        <div>{ this.isInvalid(card) ? <div>#### #### #### ####</div> : card }</div>
        <div>{ this.isInvalid(name) ? <div>FULL NAME</div> : name }</div>
        <div>{ this.isInvalid(expiry) ? <div>MM YY</div> : expiry }</div>
        <div>{ this.isInvalid(cvv) ? <div>***</div> : cvv }</div>
      </div>
    )
  }
}

export default Card