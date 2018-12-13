import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

let URL = "https://inspiration-board.herokuapp.com/boards/Kay/cards"

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errorMessage: '',
    };
  }

  addCard = (newCard) => {
    const apiPayload = {
      ...newCard,
    };
    axios.post(URL, apiPayload )
    .then( (response) => {
      console.log('API response success!', response);
      const {cards} = this.state;
      console.log("printing this.state cards array",this.state);
      cards.push(newCard);
      this.setState({
        cards
      })
    });
  }

  makeCards = () => {
    return this.state.cards.map( (card) => {
      return <Card key={card.id} id={card.id} text={card.text} emoji={card.emoji}/>
    });
  }

  componentDidMount() {
    axios.get(this.props.url + this.props.boardName + "/cards")
    .then((response) => {
      console.log("logging response from componentDidMount",response);
      const cards = response.data.map((cardObject) => {
        const newCard = {
          ...cardObject.card,
        };
        console.log("loggin newCard",newCard.card);

        return newCard;
      }).filter((card, index) => index < 10)
      this.setState({
        cards: cards,
      });
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message,
      })
    });
  }

  render() {
    return (
      <div>
      <section>
      <NewCardForm addCardCallback={this.addCard}/>
      </section>

      <section>
        Board
        {this.makeCards()}
        </section>
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
