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
    invalidExpiry: false,
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
    if (expiryDate.length > 4 || !expiryDate.match(/^[0-9]+$|^$/)) {
      return;
    }

    if (expiryDate.length === 4) {
      const date = new Date();
      const currentYear = date.getFullYear() % 100;
      const currentMonth = date.getMonth();
      const currentDate = new Date(`${currentMonth}/01/${currentYear}`);

      const enteredDate = expiryDate.split('');
      enteredDate.splice(2, 0, '/01/');
      const formattedDate = enteredDate.join('');
      const parsedDate = new Date(formattedDate);

      if (parsedDate < currentDate) {
        return this.setState({ expiry: expiryDate, invalidExpiry: true });
      }
    }

    if (expiryDate.length === 1 && expiryDate.match(/^[2-9]+$/)) {
      expiryDate = '0' + expiryDate;
    }

    if (expiryDate.length === 1 && this.state.expiry.length === 2 && expiryDate === '0') {
      expiryDate = '';
    }

    this.setState({ expiry: expiryDate, invalidExpiry: false });
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
          <label className={classes.title}>Expiry Date</label>
          <input
            className={classes.input}
            type="text"
            value={expiry}
            placeholder="MM/YY"
            onChange={event => this.handleCardExpiryInput(event.target.value)}
          />
          <label className={classes.title}>CVV</label>
          <input
            className={classes.input}
            type="text"
            value={cvv}
            placeholder="***"
            onChange={event => this.handleCvvInput(event.target.value)}
          />
        </form>
      </div>
    );
  }
}

export default App;
