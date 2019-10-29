import React, { Component } from 'react';
import classes from './Card.module.css';

class Card extends Component {
  isInvalid(input) {
    return input === null || input === undefined || input === '';
  }

  render() {
    const { card, name, expiry, cvv } = this.props;
    return (
      <div className={classes.card}>
        <div className={classes.cardType}></div>
        <div className={classes.number}>
          {this.isInvalid(card) ? <div>#### #### #### ####</div> : card}
        </div>
        <div className={classes.horizontal}>
          <div>
            <div className={classes.title}>Cardholder Name</div>
            <div className={classes.name}>{this.isInvalid(name) ? <div>FULL NAME</div> : name}</div>
          </div>
          <div>
            <div className={classes.title}>Expiry</div>
            <div className={classes.expiry}>
              {this.isInvalid(expiry) ? <div>MM YY</div> : expiry}
            </div>
          </div>
        </div>
        <div>{this.isInvalid(cvv) ? <div>***</div> : cvv}</div>
      </div>
    );
  }
}

export default Card;
