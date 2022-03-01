import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
function App() {
    return (
        <>
        <Router>
            <NavBar/>
                <Container>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/' element={<Home/>}/>
                </Routes>
                </Container>
            <Footer/>
        </Router>
        </>
    );
}

export default App;
