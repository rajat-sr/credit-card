import React from 'react';
import Card from './Card';

class App extends React.Component {
  state = {
    card: '',
    displayCardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
    invalidExpiry: false,
    cardProvider: ''
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

    let displayNumber = number.split('');
    let spaceCount = 0;
    for (let i = 4; i < number.length; i += 4) {
      displayNumber.splice(i + spaceCount, 0, ' ');
      spaceCount++;
    }

    this.setState({ card: number, displayCardNumber: displayNumber.join('') });
  }

  handleCardHolderNameInput(name) {
    this.setState({ name: name.toUpperCase() });
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
    const { card, displayCardNumber, name, expiry, cvv } = this.state;
    return (
      <div>
        <Card name={name} card={displayCardNumber} expiry={expiry} cvv={cvv} />
        <form>
          <label>Card Number</label>
          <input
            type="input"
            value={card}
            onChange={event => this.handleCardNumberInput(event.target.value)}
          />
          <label>Card Holder Name</label>
          <input
            type="input"
            value={name}
            onChange={event => this.handleCardHolderNameInput(event.target.value)}
          />
          <label>Expiry Date</label>
          <input
            type="input"
            value={expiry}
            onChange={event => this.handleCardExpiryInput(event.target.value)}
          />
          <label>CVV</label>
          <input
            type="input"
            value={cvv}
            onChange={event => this.handleCvvInput(event.target.value)}
          />
        </form>
      </div>
    );
  }
}

export default App;
