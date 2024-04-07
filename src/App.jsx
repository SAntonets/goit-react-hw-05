import { useEffect, useState, lazy, Suspense, Routes, Route, NavLink}
  from 'react'
 
import { requestPopularMovies } from './services/api'

function App() {
  requestPopularMovies();

  

  return (
    <div>App</div>
  )
}

export default App