import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './weathers/List';
import ViewWeather from './weathers/ViewWeather';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<List />} />
        <Route path='/weather/:id' element={<ViewWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
