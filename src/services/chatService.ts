import { ChatMessage, Product, SearchFilter } from '../types';
import { mockProducts } from '../data/mockProducts';

export class ChatService {
  private static instance: ChatService;
  private conversationContext: string[] = [];
  
  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public async processMessage(message: string): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowercaseMessage = message.toLowerCase();
    const messageId = Date.now().toString();
    
    // Add to conversation context
    this.conversationContext.push(lowercaseMessage);
    
    // Keep only last 5 messages for context
    if (this.conversationContext.length > 5) {
      this.conversationContext.shift();
    }
    
    // More intelligent response handling
    if (this.isGreeting(lowercaseMessage)) {
      return this.handleGreeting(messageId);
    }
    
    if (this.isProductSearch(lowercaseMessage)) {
      return this.handleProductSearch(messageId, message);
    }
    
    if (this.isPriceQuery(lowercaseMessage)) {
      return this.handlePriceQuery(messageId, message);
    }
    
    if (this.isComparisonQuery(lowercaseMessage)) {
      return this.handleComparisonQuery(messageId, message);
    }
    
    if (this.isRecommendationQuery(lowercaseMessage)) {
      return this.handleRecommendationQuery(messageId, message);
    }
    
    if (this.isAvailabilityQuery(lowercaseMessage)) {
      return this.handleAvailabilityQuery(messageId, message);
    }
    
    if (this.isHelpQuery(lowercaseMessage)) {
      return this.handleHelp(messageId);
    }
    
    // Category-specific searches with better matching
    const categoryMatch = this.detectCategory(lowercaseMessage);
    if (categoryMatch) {
      return this.handleCategorySearch(messageId, categoryMatch);
    }
    
    // Brand-specific searches
    const brandMatch = this.detectBrand(lowercaseMessage);
    if (brandMatch) {
      return this.handleBrandSearch(messageId, brandMatch);
    }
    
    // Default intelligent response
    return this.handleIntelligentDefault(messageId, message);
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isProductSearch(message: string): boolean {
    const searchKeywords = ['show', 'find', 'search', 'looking for', 'need', 'want', 'get me'];
    return searchKeywords.some(keyword => message.includes(keyword));
  }

  private isPriceQuery(message: string): boolean {
    const priceKeywords = ['price', 'cost', 'expensive', 'cheap', 'budget', 'under', 'over', '$'];
    return priceKeywords.some(keyword => message.includes(keyword));
  }

  private isComparisonQuery(message: string): boolean {
    const comparisonKeywords = ['compare', 'vs', 'versus', 'difference', 'better', 'best'];
    return comparisonKeywords.some(keyword => message.includes(keyword));
  }

  private isRecommendationQuery(message: string): boolean {
    const recommendationKeywords = ['recommend', 'suggest', 'advice', 'what should', 'help me choose'];
    return recommendationKeywords.some(keyword => message.includes(keyword));
  }

  private isAvailabilityQuery(message: string): boolean {
    const availabilityKeywords = ['available', 'in stock', 'stock', 'delivery', 'shipping'];
    return availabilityKeywords.some(keyword => message.includes(keyword));
  }

  private isHelpQuery(message: string): boolean {
    const helpKeywords = ['help', 'what can you do', 'how', 'guide', 'assist'];
    return helpKeywords.some(keyword => message.includes(keyword));
  }

  private detectCategory(message: string): string | null {
    const categoryMap = {
      'phone': 'smartphone',
      'smartphone': 'smartphone',
      'iphone': 'smartphone',
      'android': 'smartphone',
      'laptop': 'laptop',
      'computer': 'laptop',
      'macbook': 'laptop',
      'notebook': 'laptop',
      'headphone': 'audio',
      'headphones': 'audio',
      'earphone': 'audio',
      'speaker': 'audio',
      'audio': 'audio',
      'music': 'audio',
      'gaming': 'gaming',
      'game': 'gaming',
      'console': 'gaming',
      'watch': 'wearable',
      'smartwatch': 'wearable',
      'tablet': 'tablet',
      'ipad': 'tablet'
    };

    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (message.includes(keyword)) {
        return category;
      }
    }
    return null;
  }

  private detectBrand(message: string): string | null {
    const brands = ['apple', 'samsung', 'sony', 'dell', 'hp', 'asus', 'lg', 'xiaomi', 'oneplus', 'google', 'nintendo', 'dyson', 'amazon'];
    return brands.find(brand => message.includes(brand)) || null;
  }

  private handleGreeting(messageId: string): ChatMessage {
    const greetings = [
      "Hello! Welcome to ShopBot! I'm your personal shopping assistant. What can I help you find today?",
      "Hi there! Ready to discover some amazing products? I'm here to help you find exactly what you need!",
      "Hey! Great to see you! I can help you search, compare, and find the perfect products. What are you looking for?",
      "Welcome! I'm your AI shopping companion. Whether you need electronics, gadgets, or anything else - I've got you covered!"
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    return {
      id: messageId,
      type: 'bot',
      content: randomGreeting,
      timestamp: new Date(),
      suggestions: ['Show popular products', 'Electronics under $500', 'Latest smartphones', 'Gaming accessories', 'Help me choose']
    };
  }

  private handleProductSearch(messageId: string, message: string): ChatMessage {
    const searchTerms = message.toLowerCase().split(' ').filter(term => 
      !['show', 'find', 'search', 'looking', 'for', 'me', 'some', 'get'].includes(term)
    );
    
    const products = mockProducts.filter(product => 
      searchTerms.some(term => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.includes(term))
      )
    ).slice(0, 6);

    const responses = [
      `Great! I found ${products.length} products matching your search. Here are the best options:`,
      `Perfect! Here are ${products.length} excellent products that match what you're looking for:`,
      `Awesome! I've discovered ${products.length} products that should interest you:`,
      `Excellent choice! Here are ${products.length} top-rated products for you:`
    ];

    return {
      id: messageId,
      type: 'bot',
      content: products.length > 0 
        ? responses[Math.floor(Math.random() * responses.length)]
        : "I couldn't find exact matches, but here are some popular products you might like:",
      timestamp: new Date(),
      products: products.length > 0 ? products : mockProducts.slice(0, 6),
      suggestions: ['Show more options', 'Filter by price', 'Compare products', 'Check reviews', 'Similar items']
    };
  }

  private handlePriceQuery(messageId: string, message: string): ChatMessage {
    const priceMatch = message.match(/\$?(\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : 500;
    
    let products: Product[] = [];
    let responseText = '';
    
    if (message.includes('under') || message.includes('below') || message.includes('budget')) {
      products = mockProducts
        .filter(product => product.price <= maxPrice)
        .sort((a, b) => a.price - b.price)
        .slice(0, 6);
      responseText = `Here are excellent products under $${maxPrice} that offer great value:`;
    } else if (message.includes('over') || message.includes('above') || message.includes('premium')) {
      products = mockProducts
        .filter(product => product.price >= maxPrice)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      responseText = `Here are premium products over $${maxPrice} with top-tier features:`;
    } else {
      products = mockProducts
        .filter(product => Math.abs(product.price - maxPrice) <= 200)
        .sort((a, b) => Math.abs(a.price - maxPrice) - Math.abs(b.price - maxPrice))
        .slice(0, 6);
      responseText = `Here are products around $${maxPrice} price range:`;
    }

    return {
      id: messageId,
      type: 'bot',
      content: responseText,
      timestamp: new Date(),
      products,
      suggestions: ['Show cheaper options', 'Premium alternatives', 'Best value products', 'Price comparison', 'Deals & discounts']
    };
  }

  private handleComparisonQuery(messageId: string, message: string): ChatMessage {
    const brands = ['apple', 'samsung', 'sony', 'dell'];
    const mentionedBrands = brands.filter(brand => message.includes(brand));
    
    let products: Product[] = [];
    
    if (mentionedBrands.length >= 2) {
      products = mockProducts.filter(product => 
        mentionedBrands.some(brand => product.brand.toLowerCase().includes(brand))
      ).slice(0, 6);
    } else {
      // Show top-rated products from different brands for comparison
      const topProducts = mockProducts
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      products = topProducts;
    }

    return {
      id: messageId,
      type: 'bot',
      content: "Here's a comparison of top products to help you decide:",
      timestamp: new Date(),
      products,
      suggestions: ['Compare specifications', 'Price comparison', 'User reviews', 'Pros and cons', 'Best for your needs']
    };
  }

  private handleRecommendationQuery(messageId: string, message: string): ChatMessage {
    const category = this.detectCategory(message);
    let products: Product[] = [];
    
    if (category) {
      products = mockProducts
        .filter(product => 
          product.tags.includes(category) || 
          product.category.toLowerCase().includes(category)
        )
        .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
        .slice(0, 6);
    } else {
      products = mockProducts
        .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
        .slice(0, 6);
    }

    const recommendations = [
      "Based on customer reviews and ratings, here are my top recommendations:",
      "I'd highly recommend these products - they're customer favorites:",
      "These are the best-selling products that customers love:",
      "Here are my personal recommendations based on quality and value:"
    ];

    return {
      id: messageId,
      type: 'bot',
      content: recommendations[Math.floor(Math.random() * recommendations.length)],
      timestamp: new Date(),
      products,
      suggestions: ['Why these products?', 'Alternative options', 'Customer reviews', 'Best features', 'Price comparison']
    };
  }

  private handleAvailabilityQuery(messageId: string, message: string): ChatMessage {
    const inStockProducts = mockProducts.filter(product => product.inStock).slice(0, 6);
    
    return {
      id: messageId,
      type: 'bot',
      content: "Here are products currently in stock and ready to ship:",
      timestamp: new Date(),
      products: inStockProducts,
      suggestions: ['Shipping options', 'Delivery time', 'Out of stock alerts', 'Pre-order items', 'Express delivery']
    };
  }

  private handleCategorySearch(messageId: string, category: string): ChatMessage {
    const products = mockProducts.filter(product => 
      product.tags.includes(category) || 
      product.category.toLowerCase().includes(category) ||
      product.name.toLowerCase().includes(category)
    ).slice(0, 6);

    const categoryResponses = {
      smartphone: "Here are the latest and greatest smartphones:",
      laptop: "Check out these powerful laptops perfect for work and play:",
      audio: "Discover amazing audio products for the best sound experience:",
      gaming: "Level up your gaming with these awesome products:",
      wearable: "Stay connected with these smart wearable devices:",
      tablet: "Here are versatile tablets for productivity and entertainment:"
    };

    return {
      id: messageId,
      type: 'bot',
      content: categoryResponses[category as keyof typeof categoryResponses] || `Here are excellent ${category} products:`,
      timestamp: new Date(),
      products,
      suggestions: ['Top rated in category', 'New arrivals', 'Best sellers', 'Compare models', 'Price ranges']
    };
  }

  private handleBrandSearch(messageId: string, brand: string): ChatMessage {
    const products = mockProducts
      .filter(product => product.brand.toLowerCase().includes(brand))
      .slice(0, 6);

    return {
      id: messageId,
      type: 'bot',
      content: `Here are the best ${brand.charAt(0).toUpperCase() + brand.slice(1)} products we have:`,
      timestamp: new Date(),
      products,
      suggestions: [`Latest ${brand} products`, 'Brand comparison', 'Customer favorites', 'New releases', 'Best deals']
    };
  }

  private handleHelp(messageId: string): ChatMessage {
    const helpResponses = [
      "I'm here to help you find the perfect products! I can search our inventory, compare prices, check availability, and provide recommendations based on your needs.",
      "I can assist you with product searches, price comparisons, availability checks, and personalized recommendations. Just tell me what you're looking for!",
      "Let me help you shop smarter! I can find products, compare features, check stock, and suggest alternatives based on your preferences and budget."
    ];

    return {
      id: messageId,
      type: 'bot',
      content: helpResponses[Math.floor(Math.random() * helpResponses.length)],
      timestamp: new Date(),
      suggestions: ['Search products', 'Compare prices', 'Check availability', 'Get recommendations', 'Browse categories']
    };
  }

  private handleIntelligentDefault(messageId: string, message: string): ChatMessage {
    // Try to extract any product-related keywords
    const keywords = message.toLowerCase().split(' ').filter(word => word.length > 2);
    
    let products = mockProducts.filter(product => 
      keywords.some(keyword => 
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.tags.some(tag => tag.includes(keyword))
      )
    ).slice(0, 6);

    if (products.length === 0) {
      products = mockProducts
        .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
        .slice(0, 6);
    }

    const responses = [
      "I'm not entirely sure what you're looking for, but here are some popular products that might interest you:",
      "Let me show you some trending products while you think about what you need:",
      "Here are some customer favorites that might catch your attention:",
      "While I figure out exactly what you need, check out these amazing products:"
    ];

    return {
      id: messageId,
      type: 'bot',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      products,
      suggestions: ['Be more specific', 'Browse categories', 'Popular products', 'New arrivals', 'Help me search']
    };
  }

  public searchProducts(query: string, filters?: SearchFilter): Product[] {
    let results = mockProducts;

    // Apply text search with better matching
    if (query) {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
      results = results.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.brand} ${product.category} ${product.tags.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      });
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        results = results.filter(product => product.category === filters.category);
      }
      
      if (filters.brand) {
        results = results.filter(product => product.brand === filters.brand);
      }
      
      if (filters.priceRange) {
        results = results.filter(product => 
          product.price >= filters.priceRange![0] && 
          product.price <= filters.priceRange![1]
        );
      }
      
      if (filters.rating) {
        results = results.filter(product => product.rating >= filters.rating!);
      }
      
      if (filters.inStock !== undefined) {
        results = results.filter(product => product.inStock === filters.inStock);
      }
    }

    // Sort by relevance (rating * reviews)
    return results.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
  }

  public resetConversation(): void {
    this.conversationContext = [];
  }
}