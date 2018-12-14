import React from 'react';
import NewCardForm from './NewCardForm';
import {shallow} from 'enzyme' //shallow is deconstructor, going into enzyme and pulling shallow from it

  describe('NewCardForm', () => {
    test('it matches an existing snapshop', () => {
      // First Mount the Component in the testing DOM
      // Arrange
      //goes thru all html that newcardform will render and when it sees a funciton it will recognize a function 
      const wrapper = shallow( <NewCardForm addCardCallback={() => {} } />);

      // Assert that it looks like the last snapshot
      expect(wrapper).toMatchSnapshot();
  });
});
