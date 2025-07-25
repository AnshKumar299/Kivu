
import './App.css'
import AuthForm from './components/AuthForm'
import Home from './components/Home'
import TransactionTab from './components/TransactionsTab'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:<Home/>
      },{
        path:'/Transactions',
        element:<TransactionTab/>
      },{
        path:'/login',
        element:<AuthForm type="login"/>
      },{
        path:'/signup',
        element:<AuthForm type="signup"/>
      }
    ]
  )
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
