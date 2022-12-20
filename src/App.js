import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFound';
import TodoList from './pages/TodoList';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path='/todo'
        element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <TodoList />}
      />
      <Route
        path='/'
        element={!authCtx.isLoggedIn ? <Auth /> : <Navigate to='/todo' />}
      />
      <Route
        path='/signup'
        element={!authCtx.isLoggedIn ? <Auth /> : <Navigate to='/error' />}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
