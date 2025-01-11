import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import ChartsPage from './pages/ChartsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={TodoPage} />
        <Route path="/charts" component={ChartsPage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
}

export default App;
