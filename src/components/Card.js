import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
  render() {
    // console.log('card props here:',this.props);

    return (
      <div className="card">
        Card
        <section className="card__content-text">
        <h3>{this.props.text}</h3>
        </section>

        <section className="card__content-emoji">
        {this.props.emoji &&  <p>{emoji.getUnicode(this.props.emoji) ? emoji.getUnicode(this.props.emoji) : this.props.emoji}</p>}
        </section>

      </div>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  id: PropTypes.number
};

export default Card;
