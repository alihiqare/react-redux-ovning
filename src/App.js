import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter';
// import PrintText from './components/PrintText';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Simple Counter</h1>
        </header>
        <Counter />
		{/*<PrintText />*/}
      </div>
    );
  }
}

export default App;
