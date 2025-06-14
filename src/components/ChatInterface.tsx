import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Product, User } from '../types';
import { Send, RefreshCw, MessageCircle, User as UserIcon, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ChatService } from '../services/chatService';

interface ChatInterfaceProps {
  user: User;
  onAddToCart: (product: Product) => void;
  onViewProductDetails: (product: Product) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  user, 
  onAddToCart, 
  onViewProductDetails 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello ${user.name}! 👋 Welcome to ShopBot! I'm your AI shopping assistant, ready to help you discover amazing products. What can I help you find today?`,
      timestamp: new Date(),
      suggestions: ['Show popular products', 'Electronics under $500', 'Latest smartphones', 'Gaming accessories', 'Help me choose']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await chatService.processMessage(text);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again! 😅',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const resetChat = () => {
    chatService.resetConversation();
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: `Hello ${user.name}! 👋 I'm ready to help you find amazing products. What are you looking for today?`,
        timestamp: new Date(),
        suggestions: ['Show popular products', 'Electronics under $500', 'Latest smartphones', 'Gaming accessories', 'Help me choose']
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">ShopBot Assistant</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600">Online • Ready to help</p>
            </div>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
          title="Reset chat"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-300" />
        </button>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl flex ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${message.type === 'user' ? 'bg-gradient-to-br from-blue-500 to-purple-500 ml-3' : 'bg-gradient-to-br from-gray-100 to-gray-200 mr-3'}`}>
                {message.type === 'user' ? (
                  <UserIcon className="text-white" size={18} />
                ) : (
                  <Sparkles className="text-gray-600" size={18} />
                )}
              </div>
              <div className={`rounded-2xl px-6 py-4 shadow-lg ${message.type === 'user' ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-white text-gray-900 border border-gray-100'}`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Products Display */}
        {messages.map((message) => (
          message.products && message.products.length > 0 && (
            <div key={`products-${message.id}`} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {message.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewProductDetails}
                  />
                ))}
              </div>
            </div>
          )
        ))}

        {/* Enhanced Suggestions */}
        {messages.map((message) => (
          message.suggestions && message.suggestions.length > 0 && (
            <div key={`suggestions-${message.id}`} className="flex flex-wrap gap-3 mt-4">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )
        ))}

        {/* Enhanced Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="text-gray-600" size={18} />
              </div>
              <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="bg-white border-t border-gray-200 p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about products..."
              className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-2xl hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Try asking: "Show me laptops under $1000" or "Compare iPhone vs Samsung"
          </p>
        </div>
      </div>
    </div>
  );
};