
import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Filter, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';

const mockProperties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.9,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Ocean View", "Pool", "WiFi", "Kitchen"],
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    superhost: true
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 220,
    rating: 4.8,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Mountain View", "Fireplace", "Hot Tub", "Ski Access"],
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    superhost: false
  },
  {
    id: 3,
    title: "Modern City Loft",
    location: "New York, NY",
    price: 180,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["City View", "Gym", "Rooftop", "Metro Access"],
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    superhost: true
  },
  {
    id: 4,
    title: "Tropical Paradise Bungalow",
    location: "Bali, Indonesia",
    price: 95,
    rating: 4.9,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Beach Access", "Pool", "Yoga Studio", "Garden"],
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    superhost: true
  },
  {
    id: 5,
    title: "Historic Countryside Manor",
    location: "Tuscany, Italy",
    price: 320,
    rating: 4.8,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Wine Cellar", "Garden", "Historic", "Vineyard View"],
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    superhost: false
  },
  {
    id: 6,
    title: "Desert Oasis Retreat",
    location: "Scottsdale, Arizona",
    price: 275,
    rating: 4.6,
    reviews: 91,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Desert View", "Pool", "Spa", "Golf Course"],
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    superhost: true
  }
];

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  const handleSearch = (location: string) => {
    setSearchLocation(location);
    if (location.trim() === '') {
      setFilteredProperties(mockProperties);
    } else {
      const filtered = mockProperties.filter(property =>
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.title.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-rose-500">Airbnb+</h1>
            </div>
            <div className="hidden md:block">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Become a host
              </Button>
              <Button variant="outline" size="sm">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-white border-b p-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Find your perfect stay
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-rose-100">
            Discover amazing places to stay around the world
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <SearchBar onSearch={handleSearch} variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="secondary">Price</Badge>
                <Badge variant="secondary">Type of place</Badge>
                <Badge variant="secondary">Amenities</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {filteredProperties.length} stays found
            </p>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      {showFilters && (
        <FilterSidebar 
          onClose={() => setShowFilters(false)}
          onApplyFilters={(filters) => {
            // Apply filters logic here
            console.log('Filters applied:', filters);
          }}
        />
      )}

      {/* Property Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Safety information</li>
                <li>Cancellation options</li>
                <li>Report issues</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Airbnb.org</li>
                <li>Diversity & Belonging</li>
                <li>Accessibility</li>
                <li>Host referrals</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Become a host</li>
                <li>Host resources</li>
                <li>Community forum</li>
                <li>Hosting responsibly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Newsroom</li>
                <li>New features</li>
                <li>Careers</li>
                <li>Investors</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Airbnb+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
