import './App.css'
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
