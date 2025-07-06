'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPosts, getUser, getCars, Post, User, Car, generateCarTitle, getCarBrands, categorizeCarsByType, searchCars, filterCarsByAvailability, debounce, getCarImage } from '@/lib/api';
import CarPostCard from '@/components/CarPostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(20);

  const categories = ['All', 'Electric', 'SUV', 'Luxury', 'Sports', 'Hybrid', 'Sedan', 'Truck'];

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [postsData, carsData, brandsData] = await Promise.all([
        getPosts(),
        getCars(),
        getCarBrands()
      ]);

      if (postsData.length === 0) {
        setError('No blog posts available');
        return;
      }

      setPosts(postsData);
      setCars(carsData);
      setBrands(['All', ...brandsData]);

      // Fetch users for each post
      const userPromises = postsData.slice(0, 20).map(post => getUser(post.userId));
      const usersData = await Promise.all(userPromises);

      const usersMap: Record<number, User> = {};
      usersData.forEach((user, index) => {
        if (user) {
          usersMap[postsData[index].userId] = user;
        }
      });

      setUsers(usersMap);
    } catch (err) {
      setError('Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCarForPost = (post: Post): Car | undefined => {
    // Try to match post with a car by ID, or get a car based on post index
    return cars.find(car => car.id === post.id) || cars[post.id % cars.length];
  };

  // Categorized cars for filtering
  const categorizedCars = useMemo(() => categorizeCarsByType(cars), [cars]);

  // Create a mapping of posts to their categories based on associated cars
  const postsWithCategories = useMemo(() => {
    return posts.map(post => {
      const car = getCarForPost(post);
      let postCategories: string[] = ['All'];
      
      if (car) {
        // Check which categories this car belongs to
        Object.entries(categorizedCars).forEach(([category, categoryCars]) => {
          if (categoryCars.some(categoryCar => categoryCar.id === car.id)) {
            postCategories.push(category);
          }
        });
      }
      
      return {
        ...post,
        categories: postCategories,
        car: car
      };
    });
  }, [posts, cars, categorizedCars]);

  const filteredPosts = useMemo(() => {
    let filtered = postsWithCategories;

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(post => {
        const title = generateCarTitle(post, post.car);
        return title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          (post.car && (post.car.car.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            post.car.car_model.toLowerCase().includes(debouncedSearchTerm.toLowerCase())));
      });
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.categories.includes(selectedCategory));
    }

    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(post => {
        return post.car && post.car.car === selectedBrand;
      });
    }

    // Filter by availability
    if (showAvailableOnly) {
      filtered = filtered.filter(post => {
        return post.car && post.car.availability;
      });
    }

    return filtered;
  }, [postsWithCategories, debouncedSearchTerm, selectedCategory, selectedBrand, showAvailableOnly]);

  // Count posts for each category
  const categoryPostCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      if (category === 'All') {
        counts[category] = postsWithCategories.length;
      } else {
        counts[category] = postsWithCategories.filter(post => 
          post.categories.includes(category)
        ).length;
      }
    });
    return counts;
  }, [postsWithCategories, categories]);

  // Count posts for each brand
  const brandPostCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    brands.forEach(brand => {
      if (brand === 'All') {
        counts[brand] = postsWithCategories.length;
      } else {
        counts[brand] = postsWithCategories.filter(post => 
          post.car && post.car.car === brand
        ).length;
      }
    });
    return counts;
  }, [postsWithCategories, brands]);

  const loadMore = () => {
    setDisplayedPosts(prev => prev + 20);
  };

  if (loading) {
    return (
      <div>
        {/* Hero Section Skeleton */}
        <section className="bg-[#232536] text-white py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="h-8 md:h-12 bg-gray-600 rounded mb-4 md:mb-6 animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded mb-6 md:mb-8 w-3/4 animate-pulse"></div>
                <div className="h-10 md:h-12 bg-gray-600 rounded w-32 animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="h-48 md:h-64 bg-gray-600 rounded-lg mb-4 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 md:h-32 bg-gray-600 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <LoadingSpinner message="Loading car blogs and real car data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-[#232536] text-white py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                  Your Journey<br />
                  Your Car<br />
                  Your Way
                </h1>
                <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg">
                  Discover the latest car reviews, technology updates, and automotive insights.
                </p>
                <Button size="lg" isSubscribe>
                  Subscribe
                </Button>
              </div>
              <div className="relative">
                <div className="h-48 md:h-64 bg-gray-600 rounded-lg mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 md:h-32 bg-gray-600 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Overlapping Images - Fixed to fit within viewport */}
      <section className="bg-[#31323C] text-white relative py-8 md:py-16 overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Your Journey<br />
                Your Car<br />
                Your Way
              </h1>
              <p className="text-gray-300 mb-6 md:mb-8 text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0">
                Discover the latest car reviews, technology updates, and automotive insights.
              </p>
              <Button size="lg" isSubscribe>
                Subscribe
              </Button>
            </div>

            {/* Overlapping Images Grid - Constrained within container */}
           <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full order-1 lg:order-2 max-w-[500px] mx-auto lg:mx--2">

  {/* Group Wrapper for All 4 Images */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-[250px] sm:w-[300px] md:w-[400px] lg:w-auto h-full">
    
    {/* First Image */}
    <div className="absolute top-0 left-0 w-[80px] sm:w-[100px] md:w-[140px] lg:w-[190px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[380px] z-10">
      <Image
        src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop"
        alt="Muscle Car"
        fill
        className="object-cover shadow-xl"
      />
    </div>

    {/* Second Image */}
    <div className="absolute top-[20px] sm:top-[30px] md:top-[40px] lg:top-[50px] left-[60px] sm:left-[80px] md:left-[110px] lg:left-[140px] w-[80px] sm:w-[100px] md:w-[140px] lg:w-[190px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[380px] z-20">
      <Image
        src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop"
        alt="Yellow Sports Car"
        fill
        className="object-cover shadow-2xl"
      />
    </div>

    {/* Third Image */}
    <div className="absolute top-0 left-[120px] sm:left-[150px] md:left-[210px] lg:left-[270px] w-[70px] sm:w-[90px] md:w-[120px] lg:w-[190px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[380px] z-30">
      <Image
        src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Car Dashboard"
        fill
        className="object-cover shadow-2xl"
      />
    </div>

    {/* Fourth Image */}
    <div className="absolute top-[15px] sm:top-[25px] md:top-[35px] lg:top-[45px] left-[170px] sm:left-[210px] md:left-[290px] lg:left-[380px] w-[80px] sm:w-[100px] md:w-[140px] lg:w-[190px] h-[120px] sm:h-[150px] md:h-[210px] lg:h-[380px] z-20">
      <Image
        src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=400&fit=crop"
        alt="Luxury Car"
        fill
        className="object-cover shadow-2xl"
      />
    </div>

  </div>

</div>

          </div>
        </div>
      </section>

      {/* Search and Filter Section - Fully Responsive */}
      <section className="py-6 md:py-8 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search cars, brands(kia , toyota, ford , jaguar , lexus )"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5959] text-sm md:text-base"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Available only</span>
                </label>
              </div>
            </div>

            {/* Category Filters - Clean without images */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 py-2 w-full sm:w-auto">Categories:</span>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${selectedCategory === category
                        ? 'bg-[#FF5959] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                  >
                    {category}
                    {categoryPostCounts[category] !== undefined && (
                      <span className="ml-1 text-xs">({categoryPostCounts[category]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filters - Clean without images */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 py-2 w-full sm:w-auto">Brands:</span>
              <div className="flex gap-2 flex-wrap">
                {brands.slice(1, 12).map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${selectedBrand === brand
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                  >
                    {brand}
                    {brandPostCounts[brand] !== undefined && (
                      <span className="ml-1 text-xs">({brandPostCounts[brand]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section - Fully Responsive */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Car Blog Posts
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedBrand !== 'All' && ` - ${selectedBrand}`}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {Math.min(displayedPosts, filteredPosts.length)} of {filteredPosts.length} posts
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <EmptyState
              message="No blog posts found"
              description="Try adjusting your search or filter criteria"
            />
          ) : (
            <>
              <div className="space-y-6 md:space-y-8">
                {filteredPosts.slice(0, displayedPosts).map((post) => {
                  return (
                    <CarPostCard
                      key={post.id}
                      post={post}
                      user={users[post.userId]}
                      car={post.car}
                    />
                  );
                })}
              </div>

              {/* Load More Button */}
              {displayedPosts < filteredPosts.length && (
                <div className="text-center mt-8 md:mt-12">
                  <Button onClick={loadMore} size="lg">
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}