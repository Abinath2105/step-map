import logo from './logo.svg';
import './App.css';

import StepMap from '../src/ImageViewer7/Openlayer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
function App() {
  return (
    <Router>
   
    <div className="App">
    <Routes>
      <Route path="/" element={<Login/>}/>

      <Route path='/Stepmap' element={<StepMap/>}/>
   
         </Routes>
    </div>

    </Router>
  );
}

export default App;
