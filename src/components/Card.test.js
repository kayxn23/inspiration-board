import React from 'react';
import Card from './Card';
import {shallow} from 'enzyme' //shallow is deconstructor, going into enzyme and pulling shallow from it

  describe('Card', () => {
    test('it matches an existing snapshop', () => {
      //make an instance of card see if it
      //looks like something it should
      const wrapper = shallow( <Card
        id={1}
        text="dumpster fire!"
        emoji="dumpster-fire-emoji"
  />);
    expect(wrapper).toMatchSnapshot();
  });
});
