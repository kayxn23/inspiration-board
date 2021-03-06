import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

// const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

console.log(emoji);

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      emoji: '',
    };
  }
    resetState = () => {
      this.setState({
        text: '',
        emoji: '',
    });
  }

  emojiDropDown = () => {
    const emojis = [""].concat(emoji.names);
    return emojis.map((emojiname, i) => {
      return <option value={emojiname} key={i}> {emoji.getUnicode(emojiname)} </option>;
    });
  };

  onFormChange = (event) => {
  const field = event.target.name;
  const value = event.target.value;

  const updatedState = {};
  updatedState[field] = value;
  this.setState(updatedState);
}

  onSubmit = (event) => {
  event.preventDefault();

  if (this.state.text === '') return;

  console.log(event);
  this.props.addCardCallback(this.state);
  this.resetState();
}



  render() {
  return (
    <form onSubmit={this.onSubmit} name="new-card-form" id="new-card-form" className="new-card-form">
      <div className="new-card-form__form">
        <label className="new-card-form--label" htmlFor="Text">Text</label>
        <input name="text" placeholder="write text here" onChange={this.onFormChange} value={this.state.text} />
        <label className="new-card-form--label" htmlFor="species">Emoji</label>
        <select name="emoji" placeholder="" onChange={this.onFormChange} value={this.state.emoji}>
        {this.emojiDropDown()}
        </select>


      <input className="new-card-form__form-button" type="submit" name="submit" value="Add a Card" />
      </div>
    </form>
  );
}

} //end of class

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
