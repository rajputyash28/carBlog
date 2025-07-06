// Static data for better performance and fallbacks
export const STATIC_CAR_BRANDS = [
  'All', 'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 
  'Chevrolet', 'Nissan', 'Alfa Romeo', 'Lexus', 'Porsche', 'Tesla'
];

export const STATIC_CATEGORIES = [
  'All', 'Electric', 'SUV', 'Luxury', 'Sports', 'Hybrid', 'Sedan', 'Truck'
];

export const FALLBACK_CARS = [
  {
    id: 1,
    car: 'BMW',
    car_model: 'X5',
    car_color: 'Black',
    car_model_year: 2024,
    car_vin: 'WBAFR7C50BC123456',
    price: '$65,000',
    availability: true
  },
  {
    id: 2,
    car: 'Tesla',
    car_model: 'Model S',
    car_color: 'White',
    car_model_year: 2024,
    car_vin: '5YJ3E1EA4KF123456',
    price: '$89,000',
    availability: true
  },
  {
    id: 3,
    car: 'Audi',
    car_model: 'Q7',
    car_color: 'Silver',
    car_model_year: 2024,
    car_vin: 'WA1VAAF70KD123456',
    price: '$72,000',
    availability: false
  }
];

export const FALLBACK_POSTS = [
  {
    id: 1,
    title: 'BMW X5 2024 Review',
    body: 'The BMW X5 continues to set the standard for luxury SUVs with its perfect blend of performance, comfort, and technology.',
    userId: 1
  },
  {
    id: 2,
    title: 'Tesla Model S Performance Analysis',
    body: 'Tesla Model S delivers exceptional electric performance with cutting-edge autonomous driving features.',
    userId: 2
  },
  {
    id: 3,
    title: 'Audi Q7 Luxury Features Review',
    body: 'The Audi Q7 showcases German engineering excellence with premium materials and advanced safety systems.',
    userId: 3
  }
];

export const FALLBACK_USERS = [
  {
    id: 1,
    name: 'Alex Thompson',
    email: 'alex@carblog.com',
    username: 'alexthompson',
    website: 'carblog.com'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria@carblog.com',
    username: 'mariagarcia',
    website: 'carblog.com'
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'david@carblog.com',
    username: 'davidkim',
    website: 'carblog.com'
  }
];