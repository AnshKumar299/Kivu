import './App.css'
import Home from './components/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:<Home/>
      },
    ]
  )
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
