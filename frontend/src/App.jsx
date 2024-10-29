
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/registerPage'
import HomePage from './pages/homePage'

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    )
  }

export default App
