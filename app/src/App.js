import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Registration from './component/Registration';


function App() {
  return (
    
   <BrowserRouter> 
    <Route exact path ="/register" component={Registration}/>
   </BrowserRouter> 
  
  );
}

export default App;
