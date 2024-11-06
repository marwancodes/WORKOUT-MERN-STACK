import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import EditWorkout from './pages/EditWorkout';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  const { user } = useAuthContext(); //! we use user to protect our React Routes

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path='/edit/:id' element={user ? <EditWorkout /> : <Navigate to="/login" />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
