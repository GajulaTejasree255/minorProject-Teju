import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Loginpage from './Components/LoginPage/Login';
import StudentSearch from './Components/StudentSearchPage/StudentSearch';
import StudentDetail from './Components/StudentDetailPage/StudentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="StudentSearch" element={<StudentSearch />} />
        <Route path="/StudentDetail/:rollnumber" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
