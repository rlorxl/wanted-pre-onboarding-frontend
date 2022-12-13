import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import TodoList from './pages/TodoList';
import NotFound from './pages/NotFound';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path='/'
        element={authCtx.isLoggedIn ? <Navigate to='/todo' /> : <Auth />}
      />
      <Route
        path='/todo'
        element={authCtx.isLoggedIn ? <TodoList /> : <Navigate to='/' />}
      />
      <Route
        path='/login'
        element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Auth />}
      />
      <Route
        path='/signup'
        element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Auth />}
      />
      <Route path='/error' element={<NotFound />} />
    </Routes>
  );
}

export default App;
