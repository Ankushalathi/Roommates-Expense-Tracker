import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductPage from './ProductPage/ProductPage';
import RoommatesExpense from './CardPage/CardPage';


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RoommatesExpense />
    },
    {
      path: "/product",
      element: <ProductPage />
    },
  
  ])

  return (

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
