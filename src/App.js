import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form/Form.jsx';

const App = () => {
  return (
    <div className='app-wrapper'>
      <header className='app-header'>
          File dropzone
      </header>
      <div className='app-wrapper-content'>
          <Form />
      </div>
    </div>
  );
}

export default App;
