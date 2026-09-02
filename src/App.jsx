import { createBrowserRouter, RouterProvider } from 'react-router'
import React, { lazy, Suspense, useEffect } from 'react'
import Layout from './Layout/Layout'
import { CircularProgress, Box } from '@mui/material';
import NotFound from './Error/NotFound';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { initializeDemoAccounts } from './utils/initializeData';

const Home = lazy(() => import('./Pages/Home/Home'));
const Sale = lazy(() => import('./Pages/Sale/Sale'));
const Sale_info = lazy(() => import('./Layout/Sale_info'));
const Blog = lazy(() => import('./Pages/Blog/Blog'));
const Blog_info = lazy(() => import('./Layout/Blog_info'));
const Payment_Delivery = lazy(() => import('./Pages/Payment_Delivery/Payment_Delivery'));
const Map = lazy(() => import('./Pages/Map/Map'));
const Optovim = lazy(() => import('./Pages/Optovim/Optovim'));
const RecoveryPassword = lazy(() => import('./Pages/Recovery_Password/Recovery_Password'));
const ThankYou = lazy(() => import('./Pages/Recovery_Password/ThankYou'));
const Registration = lazy(() => import('./Pages/Recovery_Password/Registration'));
const Basket = lazy(() => import('./Pages/Basket/Basket'));
const ChildrenFurniture = lazy(() => import('./Pages/ChildrenFurniture/ChildrenFurniture'));
const FurnitureCategory = lazy(() => import('./Pages/ChildrenFurniture/FurnitureCategory'));
const ProductInfo = lazy(() => import('./Pages/Product/ProductInfo'));
const Favorites = lazy(() => import('./Pages/Favorites/Favorites'));
const PersonalData = lazy(() => import('./Pages/PersonalData/PersonalData'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const CardPayment = lazy(() => import('./Pages/CardPayment/CardPayment'));

const PageLoader = ({ children }) => (
  <Suspense
    fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress aria-label="Loading…" />
      </Box>
    }
  >
    {children}
  </Suspense>
);

export default function App() {
  useEffect(() => {
    initializeDemoAccounts();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <PageLoader><Home /></PageLoader> },
        { path: 'Map', element: <PageLoader><Map /></PageLoader> },
        { path: 'Sale', element: <PageLoader><Sale /></PageLoader> },
        { path: 'Sale/:id', element: <PageLoader><Sale_info /></PageLoader> },
        { path: 'Blog', element: <PageLoader><Blog /></PageLoader> },
        { path: 'Blog/:id', element: <PageLoader><Blog_info /></PageLoader> },
        { path: 'Payment_Delivery', element: <PageLoader><Payment_Delivery /></PageLoader> },
        { path: 'Optovim', element: <PageLoader><Optovim /></PageLoader> },
        { path: 'recovery-password', element: <PageLoader><RecoveryPassword /></PageLoader> },
        { path: 'registration', element: <PageLoader><Registration /></PageLoader> },
        { path: 'Basket', element: <PageLoader><Basket /></PageLoader> },
        { path: 'children-furniture', element: <PageLoader><ChildrenFurniture /></PageLoader> },
        { path: 'children-furniture/:slug', element: <PageLoader><FurnitureCategory /></PageLoader> },
        { path: 'product/:id', element: <PageLoader><ProductInfo /></PageLoader> },
        { path: 'favorites', element: <PageLoader><Favorites /></PageLoader> },
        { path: 'personal-data', element: <PageLoader><PersonalData /></PageLoader> },
        { path: 'checkout', element: <PageLoader><Checkout /></PageLoader> },
        { path: 'card-payment', element: <PageLoader><CardPayment /></PageLoader> },
      ],
    },
    {
      path: '/thank-you',
      element: <PageLoader><ThankYou /></PageLoader>,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
