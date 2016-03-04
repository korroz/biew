var React = require('react');
var ReactDOM = require('react-dom');
var Visualizer = require('./Visualizer.component.jsx');
var CursorControls = require('./CursorControls.component.jsx');

ReactDOM.render(
  <div><Visualizer /><CursorControls /></div>,
  document.getElementById('bootstrap')
);
