import { Home } from "./pages/Home/index"
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Quiz } from "./pages/Quiz/Quiz";
import { Result } from "./pages/Result/Result";
import { Login } from "./pages/Home/Login/Login";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>} />
       </Routes>  
      </div>
  );
}

export default App;