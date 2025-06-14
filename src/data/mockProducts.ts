import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    description: 'The most advanced iPhone ever with titanium design, A17 Pro chip, and pro camera system.',
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    features: ['A17 Pro Chip', '48MP Camera', '5G Ready', 'Face ID'],
    brand: 'Apple',
    tags: ['smartphone', 'premium', 'photography', 'gaming']
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    price: 2499,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    description: 'Supercharged by M3 Pro and M3 Max chips for demanding workflows.',
    rating: 4.9,
    reviews: 1542,
    inStock: true,
    features: ['M3 Pro Chip', '16GB RAM', '512GB SSD', 'Liquid Retina Display'],
    brand: 'Apple',
    tags: ['laptop', 'professional', 'creative', 'performance']
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Electronics',
    price: 1299,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    description: 'AI-powered smartphone with S Pen and 200MP camera.',
    rating: 4.7,
    reviews: 3241,
    inStock: true,
    features: ['S Pen', '200MP Camera', '5000mAh Battery', 'AI Features'],
    brand: 'Samsung',
    tags: ['smartphone', 'android', 'productivity', 'photography']
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    price: 399,
    originalPrice: 449,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
    rating: 4.6,
    reviews: 1876,
    inStock: true,
    features: ['Active Noise Canceling', '30-hour Battery', 'Touch Controls', 'Quick Charge'],
    brand: 'Sony',
    tags: ['headphones', 'wireless', 'noise-canceling', 'premium']
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    category: 'Electronics',
    price: 1099,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    description: 'The ultimate iPad experience with M2 chip and stunning Liquid Retina display.',
    rating: 4.8,
    reviews: 2134,
    inStock: true,
    features: ['M2 Chip', '12.9" Display', 'Apple Pencil Support', '5G Option'],
    brand: 'Apple',
    tags: ['tablet', 'creative', 'productivity', 'drawing']
  },
  {
    id: '6',
    name: 'Dell XPS 13',
    category: 'Electronics',
    price: 999,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    description: 'Ultra-thin laptop with InfinityEdge display and premium materials.',
    rating: 4.5,
    reviews: 987,
    inStock: true,
    features: ['Intel Core i7', '16GB RAM', '512GB SSD', 'InfinityEdge Display'],
    brand: 'Dell',
    tags: ['laptop', 'ultrabook', 'business', 'portable']
  },
  {
    id: '7',
    name: 'Nintendo Switch OLED',
    category: 'Gaming',
    price: 349,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    description: 'Enhanced gaming experience with vibrant OLED screen and improved audio.',
    rating: 4.7,
    reviews: 4521,
    inStock: true,
    features: ['OLED Screen', 'Enhanced Audio', 'Adjustable Stand', 'Joy-Con Controllers'],
    brand: 'Nintendo',
    tags: ['gaming', 'console', 'portable', 'family']
  },
  {
    id: '8',
    name: 'Apple Watch Series 9',
    category: 'Wearables',
    price: 399,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    description: 'Advanced health monitoring and fitness tracking with always-on display.',
    rating: 4.6,
    reviews: 3456,
    inStock: true,
    features: ['Health Monitoring', 'GPS', 'Water Resistant', 'Always-On Display'],
    brand: 'Apple',
    tags: ['smartwatch', 'fitness', 'health', 'wearable']
  },
  {
    id: '9',
    name: 'Kindle Paperwhite',
    category: 'Books',
    price: 139,
    originalPrice: 159,
    image: 'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg',
    description: 'Waterproof e-reader with high-resolution display and adjustable warm light.',
    rating: 4.4,
    reviews: 12543,
    inStock: true,
    features: ['Waterproof', 'Adjustable Light', '6.8" Display', 'Weeks of Battery'],
    brand: 'Amazon',
    tags: ['e-reader', 'books', 'reading', 'portable']
  },
  {
    id: '10',
    name: 'Dyson V15 Detect',
    category: 'Home',
    price: 749,
    image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
    description: 'Powerful cordless vacuum with laser dust detection and LCD screen.',
    rating: 4.5,
    reviews: 2341,
    inStock: true,
    features: ['Laser Detection', 'LCD Screen', 'Cordless', 'HEPA Filtration'],
    brand: 'Dyson',
    tags: ['vacuum', 'cordless', 'home', 'cleaning']
  }
];

// Generate additional products to reach 100+
const generationCategories = ['Electronics', 'Audio', 'Gaming', 'Wearables', 'Books', 'Home', 'Fashion', 'Sports'];
const generationBrands = ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Asus', 'LG', 'Xiaomi', 'OnePlus', 'Google'];
const imageUrls = [
  'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
  'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
  'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
  'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
  'https://images.pexels.com/photos/18105/pexels-photo.jpg',
  'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
  'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'
];

// Generate additional products
for (let i = 11; i <= 100; i++) {
  const category = generationCategories[Math.floor(Math.random() * generationCategories.length)];
  const brand = generationBrands[Math.floor(Math.random() * generationBrands.length)];
  const price = Math.floor(Math.random() * 2000) + 50;
  const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
  
  mockProducts.push({
    id: i.toString(),
    name: `${brand} ${category} Device ${i}`,
    category,
    price,
    originalPrice: Math.random() > 0.7 ? price + Math.floor(Math.random() * 200) : undefined,
    image: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    description: `High-quality ${category.toLowerCase()} device from ${brand} with premium features and excellent performance.`,
    rating,
    reviews: Math.floor(Math.random() * 5000) + 100,
    inStock: Math.random() > 0.1,
    features: ['Premium Build', 'Latest Technology', 'User Friendly', 'Warranty Included'],
    brand,
    tags: [category.toLowerCase(), 'quality', 'reliable', 'modern']
  });
}

export const categories = [...new Set(mockProducts.map(p => p.category))];
export const brands = [...new Set(mockProducts.map(p => p.brand))];