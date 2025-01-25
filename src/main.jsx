import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.jsx'
import { RouterProvider } from 'react-router-dom'



import ProductItem from './components/ProductItem.jsx'


import { lazy, Suspense } from 'react'


const Home = lazy(()=>import('./components/Home.jsx'));
const ProductList = lazy(()=>import('./components/ProductList.jsx'));
const ProductDetail = lazy(()=>import('./components/ProductDetail.jsx'));
const Cart = lazy(()=>import('./components/Cart.jsx'));
const CartDetail = lazy(()=>import('./components/CartDetail.jsx'));

const appRouter = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: 
          <Suspense fallback={
              <div>Loading...</div>
          }>
            <Home/> 
          </Suspense>
      },
      {
        path:"/ProductList",
        element: 
          <Suspense fallback={
            <div>Loading...</div>
          }>
            <ProductList/>
          </Suspense>
      },
      {
        path:"/ProductList/:_id",
        element:
          <Suspense fallback={
            <div>Loading...</div>
          }>
            <ProductDetail/>
          </Suspense>
      },
      
      {
        path:"/Cart",
        element:
          <Suspense fallback={
            <div>Loading...</div>
          }>
            <Cart/>
          </Suspense>
      },
      {
        path:"/Cart/:_id",
        element: 
          <Suspense fallback={
            <div>Loading...</div>
          }>
            <CartDetail/>
          </Suspense>
      }
    ],
    errorElement: <ErrorPage/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
