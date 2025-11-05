// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import CartPage from '../pages/Cart'

export function RouterProvider() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/carrinho" element={<CartPage />} />
    </Routes>
  );
}