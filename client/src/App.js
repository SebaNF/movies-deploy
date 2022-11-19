import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CreateMovies from './views/CreateMovies';
import Main from './views/Main';
import CreateReviews from './views/CreateReviews';
import Reviews from './views/Reviews';

function App() {
  return (
    <div className="App">
      <h1>Tomates Mohosos</h1>
      
      <Routes>
        <Route path='/movies' element={<Main/>}/>
        <Route path='/movies/new' element={<CreateMovies/>}/>
        <Route path='/movies/:idMovie/review' element={<CreateReviews/>}/>
        <Route path='/movies/:idMovie' element={<Reviews/>}/>
      </Routes>
    </div>
  );
}

export default App;
