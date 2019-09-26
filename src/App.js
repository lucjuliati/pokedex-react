import React, { Component } from 'react'
import Navbar from './components/Navbar/navbar'
import Pokemon from './components/Pokemon/pokemon'
import Dashboard from './components/Dashboard/dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    render() {
        return (
            <>
                <Router>
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={Dashboard} />
                                <Route exact path='/pokemon/:pokemonId' component={Pokemon} />
                                <Dashboard />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </>
        )
    }
}

export default App;
