import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Loginpage from './Components/LoginPage/Login';
import StudentSearch from './Components/StudentSearchPage/StudentSearch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" Component={Loginpage}/>
        <Route path = "StudentSearch" Component={StudentSearch}/>
      </Routes>
    </Router>
  );
}

export default App;
