import React, { Component } from 'react';
import classes from './Card.module.css';
import Visa from './assets/visa';
import Mastercard from './assets/mastercard';

class Card extends Component {
  isInvalid(input) {
    return input === null || input === undefined || input === '';
  }

  render() {
    const { card, name, expiry, cvv } = this.props;

    let cardNumber = card.split('');
    let spaceCount = 0;
    for (let i = 4; i < card.length; i += 4) {
      cardNumber.splice(i + spaceCount, 0, ' ');
      spaceCount++;
    }
    cardNumber = cardNumber.join('');

    let expiryDate = expiry;
    if (expiryDate.length > 2) {
      const expiryNumbers = expiryDate.split('');
      expiryNumbers.splice(2, 0, '/');
      expiryDate = expiryNumbers.join('');
    }

    let cardType = <Visa className={classes.cardType} />;
    if (card.charAt(0) === '5') {
      cardType = <Mastercard className={classes.cardType} />;
    }

    return (
      <div className={classes.card}>
        <div className={classes.cardTypeRow}>
          {cardType}
          <img className={classes.chip} alt="chip" src="https://image.ibb.co/cZeFjx/little_square.png" />
        </div>
        <div className={classes.number}>
          {this.isInvalid(cardNumber) ? <div>#### #### #### ####</div> : cardNumber}
        </div>
        <div className={classes.horizontal}>
          <div>
            <div className={classes.title}>Cardholder Name</div>
            <div className={classes.name}>
              {this.isInvalid(name) ? <div>FULL NAME</div> : name.toUpperCase()}
            </div>
          </div>
          <div>
            <div className={classes.title}>Expiry</div>
            <div className={classes.expiry}>
              {this.isInvalid(expiry) ? <div>MM/YY</div> : expiryDate}
            </div>
          </div>
        </div>
        {/* <div>{this.isInvalid(cvv) ? <div>***</div> : cvv}</div> */}
      </div>
    );
  }
}

export default Card;
