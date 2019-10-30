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

    let cardNumber = card.split('');
    let spaceCount = 0;
    for (let i = 4; i < card.length; i += 4) {
      cardNumber.splice(i + spaceCount, 0, ' ');
      spaceCount++;
    }
    cardNumber = cardNumber.join('');

    let cardLogo = <Visa className={classes.cardType} />;
    if (cardType === 'mastercard') {
      cardLogo = <Mastercard className={classes.cardType} />;
    }

    return (
      <div className={classes.card}>
        <div className={classes.cardTypeRow}>
          {cardLogo}
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
              {this.isInvalid(expiry) ? <div>MM/YY</div> : expiry}
            </div>
          </div>
        </div>
        {/* <div>{this.isInvalid(cvv) ? <div>***</div> : cvv}</div> */}
      </div>
    );
  }
}

export default Card;
