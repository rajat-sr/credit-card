import React, { Component } from 'react';
import classes from './Card.module.css';
import Visa from './assets/visa';
import Mastercard from './assets/mastercard';

class Card extends Component {
  isInvalid(input) {
    return input === null || input === undefined || input === '';
  }

  render() {
    const { card, name, expiry, cardType } = this.props;

    const hashes = '################';
    const cardNumber = hashes.replace(new RegExp('#{' + card.length + '}'), card).split('');
    cardNumber.splice(12, 0, ' ');
    cardNumber.splice(8, 0, ' ');
    cardNumber.splice(4, 0, ' ');

    let cardLogo = <Visa className={classes.cardType} />;
    if (cardType === 'mastercard') {
      cardLogo = <Mastercard className={classes.cardType} />;
    }

    let expiryDate = 'MM/YY'
    if (!this.isInvalid(expiry)) {
      expiryDate = expiryDate.replace(new RegExp('.{' + expiry.length + '}'), expiry);
    }

    return (
      <div className={classes.card}>
        <div className={classes.cardTypeRow}>
          {cardLogo}
          <img
            className={classes.chip}
            alt="chip"
            src="https://image.ibb.co/cZeFjx/little_square.png"
          />
        </div>
        <div className={classes.number}>
          {cardNumber.map((number, index) => (
            <div className={classes.individualNumber} key={index}>
              {number}
            </div>
          ))}
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
              {expiryDate}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
