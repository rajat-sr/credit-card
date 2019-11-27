import React, { Component } from 'react';
import classes from './Card.module.css';
import backcardClasses from './BackCard.module.css';
import Visa from './assets/visa';
import Mastercard from './assets/mastercard';

class BackCard extends Component {
  render() {
    const { cvv, cardType } = this.props;

    let cardLogo = <Visa className={`${classes.cardType} ${backcardClasses.cardType}`} />;
    if (cardType === 'mastercard') {
      cardLogo = <Mastercard className={`${classes.cardType} ${backcardClasses.cardType}`} />;
    }

    const stars = '***'
    const cvvNumber = stars.replace(new RegExp('\\*{' + cvv.length + '}'), cvv);

    return (
      <div className={`${classes.card} ${backcardClasses.backcard}`}>
        <div className={backcardClasses.magneticStrip}></div>
        <div className={backcardClasses.cvvStrip}>{cvvNumber}</div>
        <p className={backcardClasses.cvvText}>CVV</p>
        {cardLogo}
      </div>
    );
  }
}

export default BackCard;
