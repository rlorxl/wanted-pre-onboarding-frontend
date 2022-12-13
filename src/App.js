import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import TodoList from './pages/todo/TodoList';
import NotFound from './pages/NotFound';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path='/'
        element={authCtx.isLoggedIn ? <Navigate to='/todo' /> : <Login />}
      />
      <Route
        path='/todo'
        element={authCtx.isLoggedIn ? <TodoList /> : <Navigate to='/' />}
      />
      <Route
        path='/login'
        element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Login />}
      />
      <Route
        path='/signup'
        element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Signup />}
      />
      <Route path='/error' element={<NotFound />} />
    </Routes>
  );
}

export default App;
