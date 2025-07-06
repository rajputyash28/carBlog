export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  website?: string;
  company?: {
    name: string;
  };
}

export interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export interface CarApiResponse {
  cars: Car[];
}

export interface CarByModelResponse {
  Cars: Car[];
}

// Import static fallback data
import { FALLBACK_CARS, FALLBACK_POSTS, FALLBACK_USERS, STATIC_CAR_BRANDS } from './static-data';

// Enhanced API functions with better error handling and caching
const API_TIMEOUT = 10000; // 10 seconds timeout

// Create a fetch wrapper with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// JSONPlaceholder API functions with fallbacks
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts.length > 0 ? posts : FALLBACK_POSTS;
  } catch (error) {
    console.error('Error fetching posts, using fallback data:', error);
    return FALLBACK_POSTS;
  }
}

export async function getPost(id: number): Promise<Post | null> {
  try {
    const response = await fetchWithTimeout(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    // Return fallback post if available
    const fallbackPost = FALLBACK_POSTS.find(post => post.id === id);
    return fallbackPost || null;
  }
}

export async function getUser(id: number): Promise<User | null> {
  try {
    const response = await fetchWithTimeout(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    // Return fallback user if available
    const fallbackUser = FALLBACK_USERS.find(user => user.id === id);
    return fallbackUser || null;
  }
}

// Car API functions with enhanced error handling
export async function getCars(): Promise<Car[]> {
  try {
    const response = await fetchWithTimeout('https://myfakeapi.com/api/cars/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CarApiResponse = await response.json();
    const cars = data.cars || [];
    return cars.length > 0 ? cars : FALLBACK_CARS;
  } catch (error) {
    console.error('Error fetching cars, using fallback data:', error);
    return FALLBACK_CARS;
  }
}

export async function getCar(id: number): Promise<Car | null> {
  try {
    const response = await fetchWithTimeout(`https://myfakeapi.com/api/cars/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.Car || null;
  } catch (error) {
    console.error(`Error fetching car ${id}:`, error);
    // Return fallback car if available
    const fallbackCar = FALLBACK_CARS.find(car => car.id === id);
    return fallbackCar || null;
  }
}

export async function getCarsByModel(model: string): Promise<Car[]> {
  try {
    const response = await fetchWithTimeout(`https://myfakeapi.com/api/cars/model/${model}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
  } catch (error) {
    console.error(`Error fetching cars by model ${model}:`, error);
    return [];
  }
}

export async function getCarsByBrand(brand: string): Promise<Car[]> {
  try {
    const response = await fetchWithTimeout(`https://myfakeapi.com/api/cars/name/${brand}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
  } catch (error) {
    console.error(`Error fetching cars by brand ${brand}:`, error);
    return [];
  }
}

export async function getCarsByYear(year: number, operator?: 'gt' | 'lt'): Promise<Car[]> {
  try {
    let url = `https://myfakeapi.com/api/cars/year/${year}`;
    if (operator) {
      url += `?q=${operator}`;
    }
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
  } catch (error) {
    console.error(`Error fetching cars by year ${year}:`, error);
    return [];
  }
}

export async function getLatestPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, 6);
}

export function generateCarSpecs(car?: Car) {
  if (car) {
    return [
      { label: 'Brand', value: car.car },
      { label: 'Model', value: car.car_model },
      { label: 'Year', value: car.car_model_year.toString() },
      { label: 'Color', value: car.car_color },
      { label: 'Price', value: car.price },
      { label: 'Status', value: car.availability ? 'Available' : 'Sold Out' }
    ];
  }
  
  const specs = [
    { label: 'Model Year', value: '2024' },
    { label: 'Fuel Type', value: 'Electric' },
    { label: 'Top Speed', value: '155 mph' },
    { label: 'Price', value: '$45,000' },
    { label: 'Range', value: '300 miles' },
    { label: 'Horsepower', value: '400 HP' }
  ];
  return specs;
}

// Generate car-themed titles based on real car data or fallback
export function generateCarTitle(post: Post, car?: Car): string {
  if (car) {
    const templates = [
      `${car.car} ${car.car_model} ${car.car_model_year} Review`,
      `Exploring the ${car.car} ${car.car_model}: A Complete Guide`,
      `${car.car} ${car.car_model} - Performance and Style Combined`,
      `Why the ${car.car} ${car.car_model} is Worth Your Attention`,
      `${car.car} ${car.car_model} ${car.car_model_year}: Features and Specs`,
    ];
    return templates[post.id % templates.length];
  }
  
  const carTitles = [
    "Top 5 Electric Cars in 2025",
    "Best SUVs for Family Adventures", 
    "Luxury Car Review: Performance Meets Elegance",
    "Maintenance Tips for Your Dream Car",
    "Sports Cars That Define Speed",
    "Eco-Friendly Vehicles for the Future",
    "Classic Cars Making a Comeback",
    "Budget-Friendly Cars with Premium Features",
    "Off-Road Vehicles for Every Terrain",
    "Hybrid Technology: The Future of Driving",
    "BMW vs Mercedes: The Ultimate Comparison",
    "Tesla Model S: Electric Revolution",
    "Ford F-150: America's Favorite Truck",
    "Porsche 911: Timeless Sports Car Icon",
    "Honda Civic: Reliability Redefined",
    "Audi A4: German Engineering Excellence",
    "Toyota Camry: The Perfect Family Car",
    "Chevrolet Corvette: American Muscle",
    "Nissan GT-R: Japanese Performance Beast",
    "Volkswagen Golf: European Compact Champion"
  ];
  
  return carTitles[post.id % carTitles.length] || post.title;
}

export async function getCarBrands(): Promise<string[]> {
  try {
    const cars = await getCars();
    if (cars.length === 0) {
      return STATIC_CAR_BRANDS;
    }
    const brands = Array.from(new Set(cars.map(car => car.car))).sort();
    return ['All', ...brands];
  } catch (error) {
    console.error('Error fetching car brands, using static data:', error);
    return STATIC_CAR_BRANDS;
  }
}

// Enhanced categorize cars by type with better matching logic
export function categorizeCarsByType(cars: Car[]): Record<string, Car[]> {
  const categories: Record<string, Car[]> = {
    Electric: [],
    SUV: [],
    Luxury: [],
    Sports: [],
    Hybrid: [],
    Sedan: [],
    Truck: []
  };

  cars.forEach(car => {
    const model = car.car_model.toLowerCase();
    const brand = car.car.toLowerCase();
    
    // Electric cars - more comprehensive matching
    if (model.includes('electric') || model.includes('ev') || model.includes('e-') || 
        brand === 'tesla' || model.includes('model s') || model.includes('model 3') || 
        model.includes('model x') || model.includes('model y') || model.includes('leaf') ||
        model.includes('bolt') || model.includes('i3') || model.includes('i8') ||
        model.includes('etron') || model.includes('taycan') || model.includes('mach-e')) {
      categories.Electric.push(car);
    }
    
    // SUVs - comprehensive SUV matching
    if (model.includes('suv') || model.includes('suburban') || model.includes('tahoe') || 
        model.includes('yukon') || model.includes('escalade') || model.includes('navigator') ||
        model.includes('expedition') || model.includes('explorer') || model.includes('pilot') ||
        model.includes('highlander') || model.includes('pathfinder') || model.includes('armada') ||
        model.includes('q7') || model.includes('q5') || model.includes('q3') || 
        model.includes('x5') || model.includes('x3') || model.includes('x6') || model.includes('x7') ||
        model.includes('gx') || model.includes('rx') || model.includes('lx') || model.includes('qx') ||
        model.includes('mdx') || model.includes('rdx') || model.includes('cx-') || model.includes('forester') ||
        model.includes('outback') || model.includes('ascent') || model.includes('compass') || 
        model.includes('cherokee') || model.includes('grand cherokee') || model.includes('wrangler') ||
        model.includes('rogue') || model.includes('murano') || model.includes('santa fe') ||
        model.includes('tucson') || model.includes('sorento') || model.includes('sportage') ||
        model.includes('rav4') || model.includes('cr-v') || model.includes('escape') ||
        model.includes('edge') || model.includes('bronco') || model.includes('4runner') ||
        model.includes('sequoia') || model.includes('land cruiser') || model.includes('range rover') ||
        model.includes('discovery') || model.includes('defender') || model.includes('evoque')) {
      categories.SUV.push(car);
    }
    
    // Luxury cars - expanded luxury brand recognition
    if (brand === 'mercedes-benz' || brand === 'mercedes' || brand === 'bmw' || brand === 'audi' || 
        brand === 'lexus' || brand === 'cadillac' || brand === 'lincoln' ||
        brand === 'bentley' || brand === 'rolls-royce' || brand === 'maserati' ||
        brand === 'aston martin' || brand === 'lamborghini' || brand === 'ferrari' ||
        brand === 'porsche' || brand === 'jaguar' || brand === 'land rover' ||
        brand === 'infiniti' || brand === 'acura' || brand === 'maybach' ||
        brand === 'alfa romeo' || brand === 'genesis' || model.includes('amg') ||
        model.includes('m series') || model.includes('rs') || model.includes('s-line') ||
        model.includes('quattro') || model.includes('luxury') || model.includes('premium')) {
      categories.Luxury.push(car);
    }
    
    // Sports cars - comprehensive sports car matching
    if (model.includes('corvette') || model.includes('mustang') || model.includes('camaro') ||
        model.includes('challenger') || model.includes('charger') || model.includes('911') ||
        model.includes('boxster') || model.includes('cayman') || model.includes('gt-r') ||
        model.includes('370z') || model.includes('350z') || model.includes('supra') ||
        model.includes('rx-7') || model.includes('rx-8') || model.includes('miata') ||
        model.includes('viper') || model.includes('gto') || model.includes('firebird') ||
        model.includes('trans am') || model.includes('z4') || model.includes('slk') ||
        model.includes('sl-class') || model.includes('amg') || model.includes('m3') ||
        model.includes('m5') || model.includes('m6') || model.includes('s4') ||
        model.includes('s5') || model.includes('rs') || model.includes('type r') ||
        model.includes('sti') || model.includes('evo') || model.includes('nsx') ||
        model.includes('gt') || model.includes('sport') || model.includes('turbo') ||
        model.includes('coupe') || model.includes('roadster') || model.includes('convertible') ||
        brand === 'ferrari' || brand === 'lamborghini' || brand === 'mclaren' ||
        brand === 'lotus' || brand === 'alfa romeo') {
      categories.Sports.push(car);
    }
    
    // Hybrid cars
    if (model.includes('hybrid') || model.includes('prius') || model.includes('camry hybrid') ||
        model.includes('accord hybrid') || model.includes('fusion hybrid') || 
        model.includes('escape hybrid') || model.includes('highlander hybrid') ||
        model.includes('rx hybrid') || model.includes('gs hybrid') || model.includes('ls hybrid') ||
        model.includes('insight') || model.includes('cr-z') || model.includes('volt') ||
        model.includes('ioniq') || model.includes('niro') || model.includes('rav4 hybrid')) {
      categories.Hybrid.push(car);
    }
    
    // Sedans - comprehensive sedan matching
    if (model.includes('sedan') || model.includes('camry') || model.includes('accord') ||
        model.includes('civic') || model.includes('corolla') || model.includes('altima') ||
        model.includes('sentra') || model.includes('maxima') || model.includes('impala') ||
        model.includes('malibu') || model.includes('fusion') || model.includes('focus') ||
        model.includes('jetta') || model.includes('passat') || model.includes('a3') ||
        model.includes('a4') || model.includes('a6') || model.includes('a8') ||
        model.includes('3 series') || model.includes('5 series') || model.includes('7 series') ||
        model.includes('c-class') || model.includes('e-class') || model.includes('s-class') ||
        model.includes('is') || model.includes('es') || model.includes('gs') ||
        model.includes('ls') || model.includes('cts') || model.includes('ats') ||
        model.includes('xts') || model.includes('continental') || model.includes('mkz') ||
        model.includes('legacy') || model.includes('impreza') || model.includes('wrx') ||
        model.includes('sonata') || model.includes('elantra') || model.includes('genesis') ||
        model.includes('optima') || model.includes('forte') || model.includes('rio') ||
        model.includes('avalon') || model.includes('taurus') || model.includes('lacrosse') ||
        model.includes('regal') || model.includes('200') || model.includes('300')) {
      categories.Sedan.push(car);
    }
    
    // Trucks
    if (model.includes('f-150') || model.includes('f-250') || model.includes('f-350') ||
        model.includes('silverado') || model.includes('sierra') || model.includes('ram') ||
        model.includes('tundra') || model.includes('tacoma') || model.includes('frontier') ||
        model.includes('titan') || model.includes('ridgeline') || model.includes('colorado') ||
        model.includes('canyon') || model.includes('ranger') || model.includes('gladiator') ||
        model.includes('1500') || model.includes('2500') || model.includes('3500') ||
        model.includes('truck') || model.includes('pickup')) {
      categories.Truck.push(car);
    }
  });

  return categories;
}

// Enhanced search function for cars
export function searchCars(cars: Car[], searchTerm: string): Car[] {
  if (!searchTerm) return cars;
  
  const term = searchTerm.toLowerCase();
  return cars.filter(car => 
    car.car.toLowerCase().includes(term) ||
    car.car_model.toLowerCase().includes(term) ||
    car.car_color.toLowerCase().includes(term) ||
    car.car_model_year.toString().includes(term)
  );
}

// Filter cars by availability
export function filterCarsByAvailability(cars: Car[], availableOnly: boolean): Car[] {
  if (!availableOnly) return cars;
  return cars.filter(car => car.availability);
}

// Filter cars by price range
export function filterCarsByPriceRange(cars: Car[], minPrice: number, maxPrice: number): Car[] {
  return cars.filter(car => {
    const price = parseFloat(car.price.replace('$', '').replace(',', ''));
    return price >= minPrice && price <= maxPrice;
  });
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get car image based on car brand and model
export function getCarImage(car?: Car): string {
  if (!car) {
    const defaultImages = [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop'
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }

  const brand = car.car.toLowerCase();
  const model = car.car_model.toLowerCase();

  // Brand-specific images
  const brandImages: Record<string, string> = {
    'bmw': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    'mercedes-benz': 'https://images.unsplash.com/photo-1592309905620-e5b59f6dcb98?w=600&h=400&fit=crop',
    'mercedes': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    'audi': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    'tesla': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
    'porsche': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&h=400&fit=crop',
    'ferrari': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'lamborghini': 'https://images.unsplash.com/photo-1635942185703-65cbbedb555a?w=600&h=400&fit=crop',
    'ford': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
    'chevrolet': 'https://images.unsplash.com/photo-1504078151140-0d07249b8a9a?w=600&h=400&fit=crop',
    'toyota': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    'honda': 'https://images.unsplash.com/photo-1578659258511-4a4e7dee7344?w=600&h=400&fit=crop',
    'nissan': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop',
    'lexus': 'https://images.unsplash.com/photo-1577496549804-8b05f1f67338?w=600&h=400&fit=crop',
    'cadillac': 'https://images.unsplash.com/photo-1589148938909-4d241c91ee52?w=600&h=400&fit=crop',
    'jaguar': 'https://images.unsplash.com/photo-1592929881470-65c6db486987?w=600&h=400&fit=crop',
    'land rover': 'https://images.unsplash.com/photo-1610625679301-38642e0a60bd?w=600&h=400&fit=crop',
    'volkswagen': 'https://images.unsplash.com/photo-1605475300318-c377291697ac?w=600&h=400&fit=crop',
    'hyundai': 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    'kia': 'https://images.unsplash.com/photo-1688893287874-ac7fbd686c24?w=600&h=400&fit=crop',
    'mazda': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop',
    'subaru': 'https://images.unsplash.com/photo-1636074641063-1c2152f1b31e?w=600&h=400&fit=crop',
    'infiniti': 'https://images.unsplash.com/photo-1584592839429-197ba37a7f3c?w=600&h=400&fit=crop',
    'acura': 'https://images.unsplash.com/photo-1613288833656-86d453c0298f?w=600&h=400&fit=crop',
    'alfa romeo': 'https://images.unsplash.com/photo-1729349385457-dee64f37ad31?w=600&h=400&fit=crop'
  };

  // Model-specific images for sports cars
  if (model.includes('corvette') || model.includes('mustang') || model.includes('camaro')) {
    return 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop';
  }
  if (model.includes('911') || model.includes('boxster') || model.includes('cayman')) {
    return 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop';
  }
  if (model.includes('f-150') || model.includes('silverado') || model.includes('ram')) {
    return 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop';
  }

  // Return brand-specific image or default
  return brandImages[brand] || 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop';
}

// Generate user avatars with better variety and fallbacks
export function getUserAvatar(user?: User): string {
  if (!user) return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face';
  
  // More diverse and reliable avatar collection
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', // Male 1
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', // Male 2
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', // Female 1
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', // Male 3
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', // Female 2
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', // Male 4
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', // Female 3
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face', // Female 4
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face', // Female 5
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'  // Male 5
  ];
  
  return avatars[user.id % avatars.length];
}