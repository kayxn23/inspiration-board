import React from 'react';
import Board from './Board';
import {shallow} from 'enzyme' //shallow is deconstructor, going into enzyme and pulling shallow from it

  describe('Board', () => {
    test('it matches an existing snapshop', () => {
      //make an instance of card see if it
      //looks like something it should
      const wrapper = shallow( <Board
        url="url string"
        boardName="boardname"
  />);
    expect(wrapper).toMatchSnapshot();
  });
});
