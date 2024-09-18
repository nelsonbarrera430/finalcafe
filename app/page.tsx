"use client";

import { useState } from 'react';

export default function Home() {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Estado del cuadro de diálogo

  const products = [
    { title: "Café Helado", price: 20, imgSrc: "https://cafesolocontigo.com/wp-content/uploads/2020/01/Cafe-con-helado.jpg" },
    { title: "Capuchino", price: 25, imgSrc: "https://www.cafes-santacristina.com/sites/default/files/2023-09/capuchino.jpg" },
    { title: "Café con Leche", price: 30, imgSrc: "https://images.ecestaticos.com/6jgtHfeNPSAsiZFpRatUQ0aYT3E=/0x0:2121x1414/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fc7f%2F295%2F55f%2Fc7f29555f24ee4811e9c47b85fab3617.jpg" },
    { title: "Galletas de Café", price: 15, imgSrc: "https://beevoo.net/blog/wp-content/uploads/2021/04/galletas-de-cafe-y-chocolate.jpg" },
    { title: "Café Negro", price: 22, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG" },
    { title: "Café Chocolate", price: 28, imgSrc: "https://www.cafegra.com/wp-content/uploads/2019/10/cafe-xocolata.jpg" },
  ];

  const handlePurchase = (product: { title: string; price: number }) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.title === product.title);
      if (existingProduct) {
        return prevCart.map(item =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setTotalAmount(prevTotal => prevTotal + product.price);
  };

  const handleRemove = (title: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.title === title);
      if (product) {
        if (product.quantity > 1) {
          return prevCart.map(item =>
            item.title === title
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter(item => item.title !== title);
        }
      }
      return prevCart;
    });
    setTotalAmount(prevTotal => {
      const product = cart.find(item => item.title === title);
      return product ? prevTotal - product.price : prevTotal;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    setTotalAmount(0);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCheckoutOpen(false);
  };

  const handleOptionSelect = (option: string) => {
    alert(`Opción seleccionada: ${option}`);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-screen h-screen bg-zinc-50">
      <header className="col-span-1 md:col-span-3 h-44 p-10 bg-white shadow-md flex flex-col items-center justify-center relative">
        <h1 className="text-black font-extrabold text-4xl md:text-5xl lg:text-6xl text-center font-display">
          Café del Alba
        </h1>
        <p className="text-black mt-2 text-center text-lg">
          Cada taza de café es una experiencia única. Nos dedicamos a ofrecerte el mejor café, elaborado con granos seleccionados y una pasión inigualable por la excelencia.
        </p>
        <div className="absolute top-0 right-0 p-4 flex items-center space-x-4">
          <button
            onClick={handleClearCart}
            className="bg-gray-800 text-white p-2 rounded-full flex items-center hover:bg-gray-900 transition-colors duration-300"
          >
            <span className="text-xl">🛒</span>
          </button>
          <p className="text-lg font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-screen h-auto p-10">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imgSrc={product.imgSrc}
            title={product.title}
            type="Natural"
            price={product.price}
            onPurchase={() => handlePurchase(product)}
          />
        ))}
      </div>

      {/* Cart section */}
      <div className="col-span-1 md:col-span-3 p-10 bg-white shadow-md">
        <h2 className="text-black font-bold text-2xl mb-4">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.title} className="flex justify-between items-center mb-2">
                <span>{item.title} x{item.quantity}</span>
                <button
                  onClick={() => handleRemove(item.title)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <button
            onClick={handleCheckout}
            className="mt-4 w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            Realizar Compra
          </button>
        )}
      </div>

      {/* Checkout dialog */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-black font-bold text-xl mb-4">Selecciona una opción</h3>
            <button
              onClick={() => handleOptionSelect('Recoger en caja')}
              className="w-full px-4 py-2 bg-blue-900 text-white rounded-lg mb-2 hover:bg-blue-600 transition-colors duration-300"
            >
              Recoger en caja
            </button>
            <button
              onClick={() => handleOptionSelect('Para llevar')}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
            >
              Para llevar
            </button>
            <button
              onClick={handleCloseDialog}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ imgSrc, title, type, price, onPurchase }: { imgSrc: string; title: string; type: string; price: number; onPurchase: () => void }) {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
      <div className="relative w-full h-72 mb-4">
        <img className="w-full h-full object-cover rounded-lg" src={imgSrc} alt={title} />
      </div>
      <h3 className="text-black font-bold text-xl mb-2">{title}</h3>
      <p className="text-black text-lg mb-1">{type}</p>
      <p className="text-black font-bold text-lg mb-3">${price.toFixed(2)}</p>
      <button onClick={onPurchase} className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Realizar Compra
      </button>
    </div>
  );
}
