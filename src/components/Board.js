import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

let URL = "https://inspiration-board.herokuapp.com/boards/Kay/cards"

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errorMessage: '',
    };
  }

  removeCard = (cardId) => {
    console.log("cardid", cardId);
    let DELETE_URL = `https://inspiration-board.herokuapp.com/cards/${cardId}`
    axios.delete(DELETE_URL)
     .then( (response) => {
       console.log("printing response in delete", response);
       //is it bad practice to directly itereate thru state.cards?
       let deleteIndex = 0;
       const modifiedCards = this.state.cards
        modifiedCards.forEach((card, index) => {
          if(cardId === index){
            deleteIndex = index;
          }
        });

        modifiedCards.splice(deleteIndex, 1);

        this.setState({
          cards: modifiedCards
        })

     })
  }

  addCard = (newCard) => {
    console.log("what is new cards",newCard);
    axios.post(URL, newCard)
    .then( (response) => {
      console.log('API response success!', response);
      const {cards} = this.state;
      console.log("printing this.state cards array",this.state);
      cards.push(newCard);
      this.setState({
        cards
      })
    })
    .catch(error => {
      console.log(error.message);
      this.setState({
        errorMessage: error.message
      });
    });
  };

  makeCards = () => {
    return this.state.cards.map( (card) => {
      console.log("printing card id from borad",card.id);
      return <Card key={card.id} id={card.id} text={card.text} emoji={card.emoji} removeCardCallback={this.removeCard}/>
    });
  }

//this will get called when we pull in data and adding them to our state (card in state)
//componentDidMount happens automatically
//here we want to add some extra things to componentDidMount
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
      });

      this.setState({
        cards: cards,
      });
    })
    .catch((error) => {
      console.log("printing error mesg", error);
      this.setState({
        errorMessage: error.message,
      })
    });
  }

  render() {
    return (
      <div>
      <section>
      <NewCardForm addCardCallback={this.addCard} />
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
