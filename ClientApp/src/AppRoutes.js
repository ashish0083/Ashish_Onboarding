import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Customer from "./components/Customer";
import ProductsData from "./components/Products/ProductDetails";
import StoresData from "../src/components/Store/StoreDetails";
import SalesData from "../src/components/Sales/SalesDetails"

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
    },
    {
        path: '/api/ProductDetails',
        element: <ProductsData />
    },
    {
        path: '/api/CustomerDetails',
        element: <Customer />
    },
    {
        path: '/api/Store',
        element: <StoresData />
    },
    {
        path: '/api/Sales',
        element: <SalesData />
    },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
