import React from 'react';
import Card from './Card';
import classes from './App.module.css';
import BackCard from './BackCard';

class App extends React.Component {
  state = {
    card: '',
    name: '',
    expiry: '',
    cvv: '',
  };

  isInvalid(input) {
    return input === '' || input === null || input === undefined;
  }

  isNumber(input) {
    return input.match(/^[0-9]+$|^$/);
  }

  handleCardNumberInput(number) {
    if (!this.isNumber(number) || number.length > 16) {
      return;
    }

    this.setState({ card: number });
  }

  handleCardHolderNameInput(name) {
    this.setState({ name: name });
  }

  handleCardExpiryInput(expiryDate) {
    const mmyyRegex = /^[0-9]+\/*[0-9]*$|^$/;
    if (expiryDate.length > 5 || !expiryDate.match(mmyyRegex)) {
      return;
    }

    if (expiryDate.length === 1 && expiryDate.match(/^[2-9]+$/)) {
      expiryDate = '0' + expiryDate;
    }

    if (expiryDate.length === 3 && !expiryDate.split('').includes('/')) {
      expiryDate = expiryDate.split('');
      expiryDate.splice(2, 0, '/');
      expiryDate = expiryDate.join('');
    }

    if (expiryDate.length === 1 && this.state.expiry.length === 2 && expiryDate === '0') {
      expiryDate = '';
    }

    this.setState({ expiry: expiryDate });
  }

  handleCvvInput(cvv) {
    if (!this.isNumber(cvv) || cvv.length > 3) {
      return;
    }

    this.setState({ cvv: cvv });
  }

  render() {
    const { card, name, expiry, cvv } = this.state;
    let cardType = 'visa';
    if (card.charAt(0) === '5') {
      cardType = 'mastercard';
    }

    return (
      <div className={classes.App}>
        <div>
          <Card name={name} card={card} expiry={expiry} cardType={cardType} />
          <BackCard cvv={cvv} cardType={cardType} />
        </div>
        <form className={classes.form}>
          <label className={classes.title}>Card Number</label>
          <input
            className={classes.input}
            type="text"
            value={card}
            placeholder="#### #### #### ####"
            onChange={event => this.handleCardNumberInput(event.target.value)}
          />
          <label className={classes.title}>Cardholder Name</label>
          <input
            className={classes.input}
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={event => this.handleCardHolderNameInput(event.target.value)}
          />
          <div className={classes.horizontalFlex}>
            <div className={classes.verticalFlex}>
              <label className={classes.title}>Expiry Date</label>
              <input
                className={classes.input}
                type="text"
                value={expiry}
                placeholder="MM/YY"
                onChange={event => this.handleCardExpiryInput(event.target.value)}
              />
            </div>
            <div className={classes.verticalFlex}>
              <label className={classes.title}>CVV</label>
              <input
                className={classes.input}
                type="text"
                value={cvv}
                placeholder="***"
                onChange={event => this.handleCvvInput(event.target.value)}
              />
            </div>
            <div className={classes.button}>Submit</div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
