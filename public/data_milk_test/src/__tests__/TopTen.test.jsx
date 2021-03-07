import React from 'react';
import TopTen from '../TopTen';
import ReactDOM from "react-dom";

test('render "TopTen" without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopTen/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
