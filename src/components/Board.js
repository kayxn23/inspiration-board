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
        Board
        {this.makeCards()}
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
