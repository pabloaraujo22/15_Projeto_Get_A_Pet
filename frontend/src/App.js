import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

// pages
import Home from './assets/components/pages/Auth/Home';
import Login from './assets/components/pages/Auth/Login';
import Register from './assets/components/pages/Auth/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </Router> 
    );
}
export default App;