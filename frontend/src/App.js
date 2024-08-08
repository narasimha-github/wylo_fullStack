import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreatePost from './components/CreatePost'
import ShowPost from './components/ShowPost'
import './App.css'

const App = () => {
  const [chaild, setChaild] = useState('')

  const handleData = val => {
    setChaild(val)
    console.log(val)
  }

  return (
    <>
     <Router>
      <Routes>
        <Route exact path="/" element={<ShowPost data={chaild} />} />
        <Route exact path="/show" element={<CreatePost ondata={handleData} />} />
      </Routes>
      </Router>
    </>
  )
}

export default App