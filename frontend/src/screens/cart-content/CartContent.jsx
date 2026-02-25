import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [itensCart, setItensCart] = useState([]);

  function adicionarAoCart(produto) {
    setItensCart(prev => {
      const existe = prev.find(p => p.id === produto.id);
      if (existe) return prev; // já está no cart
      return [...prev, { ...produto, quantidade: 1, precoVenda: produto.precoVenda ?? produto.preco * 1.5 }];
    });
  }

  function removerDoCart(id) {
    setItensCart(prev => prev.filter(p => p.id !== id));
  }

  function atualizarQtd(id, novaQtd) {
    if (novaQtd < 1) return removerDoCart(id);
    setItensCart(prev => prev.map(p => p.id === id ? { ...p, quantidade: novaQtd } : p));
  }

  function estaNoCart(id) {
    return itensCart.some(p => p.id === id);
  }

  return (
    <CartContext.Provider value={{ itensCart, adicionarAoCart, removerDoCart, atualizarQtd, estaNoCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}