import React from 'react';
import App from '../App';
import ReactDOM from "react-dom";

test('rendering without errors, with footer search', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
