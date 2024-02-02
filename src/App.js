import {Switch, Route, Redirect} from 'react-router-dom'

import Account from './components/Account'
import LoginPage from './components/LoginPage'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchMovies from './components/SearchMovies'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Popular} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/top-rated" component={TopRated} />
    <ProtectedRoute exact path="/upcoming" component={Upcoming} />
    <ProtectedRoute exact path="/movie/:id" component={SingleMovieDetails} />
    <ProtectedRoute exact path="/search" component={SearchMovies} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
