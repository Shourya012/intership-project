import { useState, useEffect } from 'react';
import { User, Product, CartItem } from './types';
import { AuthModal } from './components/AuthModal';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { ProductModal } from './components/ProductModal';
import { CartSidebar } from './components/CartSidebar';
import { ChatService } from './services/chatService';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const chatService = ChatService.getInstance();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogin = async (email: string) => {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleRegister = async (name: string, email: string) => {
    // Simulate registration API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCartItems([]);
    localStorage.removeItem('cart');
    chatService.resetConversation();
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });

    // Show a brief success message (you could implement a toast notification here)
    console.log(`Added ${product.name} to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = chatService.searchProducts(query);
      
      // Send search query to chatbot as well
      if (user) {
        // This could trigger a chatbot response with search results
        console.log('Search query:', query, 'Results:', results.length);
      }
    } 
  };

  const handleCheckout = () => {
    alert('🎉 Checkout functionality would be implemented here! Your order is being processed.');
    setShowCartSidebar(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ShopBot</h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Your AI-powered shopping assistant. Sign in to start discovering amazing products tailored just for you with intelligent recommendations.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 text-lg"
          >
            Get Started
          </button>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        user={user}
        cartItems={cartItems}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onSearch={handleSearch}
        onCartOpen={() => setShowCartSidebar(true)}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="flex-1 flex">
        <div className="flex-1">
          <ChatInterface
            user={user}
            onAddToCart={handleAddToCart}
            onViewProductDetails={handleViewProductDetails}
          />
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddToCart={handleAddToCart}
      />

      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}

export default App;