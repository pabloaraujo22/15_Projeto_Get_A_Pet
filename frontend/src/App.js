import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Message from './components/layouts/Message';
import NavBar from './components/layouts/NavBar';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
import AddPet from './components/pages/Pet/AddPet';
import MyPets from './components/pages/Pet/MyPets';
import Profile from './components/pages/User/Profile';
import { UserProvider } from './context/UserContext';
function App() {
    return (
        <>
        <Router>
            <UserProvider>
                <NavBar/>
                    <Message/>
                    <Container>
                    <Routes>
                        <Route path='/pet/mypets' element={<MyPets/>}/>
                        <Route path='/pet/add' element={<AddPet/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/user/profile' element={<Profile/>}/>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                    </Container>
                <Footer/>
            </UserProvider>
        </Router>
        </>
    );
}

export default App;
