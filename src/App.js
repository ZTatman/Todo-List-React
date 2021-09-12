import logo from './logo.svg';
import './App.css';
import ListTaskComponent from './components/ListTaskComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import TitleComponent from './components/TitleComponent';
import AddTaskBarComponent from './components/AddTaskBarComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
            <div className="container">
              <TitleComponent/>
              <Switch>
                <Route path="/tasks" component={ListTaskComponent} >
                  <ListTaskComponent />                

                </Route>
                <Route path="/" exact component={ListTaskComponent}>
                <ListTaskComponent />                

                </Route>

              </Switch>
            </div>
          <FooterComponent/>
      </Router>
    </div>

  );
}

export default App;
