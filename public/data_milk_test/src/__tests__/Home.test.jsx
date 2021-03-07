import React from 'react';
import Home from '../Home';
import ReactDOM from "react-dom";

test('render "Home" without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
