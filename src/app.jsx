import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/web.scss'
import Navbar from './view/Navbar'
import Auth from './view/Auth'
import Todos from './pages/Todos'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />} errorElement={<ErrorPage />}>
      <Route path='/' element={<Todos />} />
      <Route path='/auth' element={<Auth />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
