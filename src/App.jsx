import React from 'react'
import { Router, Route } from './Router.jsx'
import HomePage from './HomePage.jsx'
import Episodes from './pages/Episodes.jsx'
import ProducerNotes from './pages/ProducerNotes.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/producer-notes" component={ProducerNotes} />
    </Router>
  )
}

export default App

