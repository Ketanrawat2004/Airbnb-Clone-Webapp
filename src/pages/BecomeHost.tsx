
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Camera, 
  DollarSign, 
  Calendar,
  Users,
  Star,
  Shield,
  Heart,
  TrendingUp,
  ChevronRight,
  Check,
  ArrowRight,
  Upload,
  Building,
  Wifi,
  Car,
  Coffee,
  Tv,
  AirVent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BecomeHost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    maxGuests: '',
    pricePerNight: '',
    amenities: [] as string[],
    images: [] as File[],
    hostName: '',
    hostEmail: '',
    hostPhone: '',
  });

  const steps = [
    { id: 1, title: 'Property Type', icon: Home },
    { id: 2, title: 'Location', icon: MapPin },
    { id: 3, title: 'Property Details', icon: Building },
    { id: 4, title: 'Amenities', icon: Star },
    { id: 5, title: 'Photos', icon: Camera },
    { id: 6, title: 'Pricing', icon: DollarSign },
    { id: 7, title: 'Host Info', icon: Users },
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'parking', label: 'Free Parking', icon: Car },
    { id: 'kitchen', label: 'Kitchen', icon: Coffee },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'ac', label: 'Air Conditioning', icon: AirVent },
    { id: 'pool', label: 'Swimming Pool', icon: Home },
    { id: 'gym', label: 'Gym', icon: TrendingUp },
    { id: 'spa', label: 'Spa', icon: Heart },
  ];

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', description: 'A place that\'s part of a larger building' },
    { id: 'house', label: 'House', description: 'A standalone home with private entrance' },
    { id: 'villa', label: 'Villa', description: 'A luxury property with premium amenities' },
    { id: 'resort', label: 'Resort', description: 'A vacation property with multiple facilities' },
    { id: 'hotel', label: 'Hotel', description: 'A commercial accommodation property' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10) // Limit to 10 images
    }));
  };

  const handleSubmit = async () => {
    try {
      toast.loading('Submitting your property...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Property submitted successfully! We\'ll review it within 24 hours.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to submit property. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of property do you have?</h2>
              <p className="text-lg text-gray-600">Choose the option that best describes your property</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.propertyType === type.id
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-25'
                  }`}
                  onClick={() => handleInputChange('propertyType', type.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      formData.propertyType === type.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Home className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{type.label}</h3>
                      <p className="text-gray-600 mt-1">{type.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Where is your property located?</h2>
              <p className="text-lg text-gray-600">Provide the address details for your property</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  placeholder="Enter your property name"
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Enter street address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your property</h2>
              <p className="text-lg text-gray-600">Provide details about the space and capacity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="maxGuests">Max Guests</Label>
                <Select value={formData.maxGuests} onValueChange={(value) => handleInputChange('maxGuests', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select max guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Property Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your property, highlight unique features and what makes it special..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What amenities do you offer?</h2>
              <p className="text-lg text-gray-600">Select all the amenities available at your property</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenitiesList.map((amenity) => (
                <motion.div
                  key={amenity.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.amenities.includes(amenity.id)
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                  onClick={() => handleAmenityToggle(amenity.id)}
                >
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-lg mb-2 ${
                      formData.amenities.includes(amenity.id) ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <amenity.icon className="h-6 w-6" />
                    </div>
                    <p className="font-medium text-sm">{amenity.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Add photos of your property</h2>
              <p className="text-lg text-gray-600">Upload high-quality photos to showcase your space</p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-300 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Click to upload photos</p>
                <p className="text-sm text-gray-500">Upload up to 10 photos (JPG, PNG)</p>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Property ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute top-1 right-1 bg-white rounded-full p-1">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Set your pricing</h2>
              <p className="text-lg text-gray-600">How much would you like to charge per night?</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Label htmlFor="pricePerNight">Price per night (₹)</Label>
              <div className="relative mt-2">
                <Input
                  id="pricePerNight"
                  type="number"
                  placeholder="0"
                  value={formData.pricePerNight}
                  onChange={(e) => handleInputChange('pricePerNight', e.target.value)}
                  className="text-2xl font-bold text-center py-4"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              
              {formData.pricePerNight && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Estimated monthly earnings</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(parseInt(formData.pricePerNight) * 15).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">Based on 50% occupancy rate</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about yourself</h2>
              <p className="text-lg text-gray-600">Provide your contact information</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <Label htmlFor="hostName">Full Name</Label>
                <Input
                  id="hostName"
                  placeholder="Enter your full name"
                  value={formData.hostName}
                  onChange={(e) => handleInputChange('hostName', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="hostEmail">Email Address</Label>
                <Input
                  id="hostEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.hostEmail}
                  onChange={(e) => handleInputChange('hostEmail', e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="hostPhone">Phone Number</Label>
                <Input
                  id="hostPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.hostPhone}
                  onChange={(e) => handleInputChange('hostPhone', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-rose-50">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-12 text-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Become a <span className="text-rose-500">Host</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Share your space and earn money by hosting travelers from around the world
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">List your space</h3>
                <p className="text-gray-600">Share your property with our global community</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Host on your terms</h3>
                <p className="text-gray-600">Set your own schedule and house rules</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Earn extra income</h3>
                <p className="text-gray-600">Turn your space into a source of income</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">
                      Step {currentStep} of {steps.length}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round((currentStep / steps.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-rose-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        currentStep === step.id
                          ? 'bg-rose-500 text-white'
                          : currentStep > step.id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="min-h-[400px]">
                  {renderStep()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    <span>Previous</span>
                  </Button>
                  
                  {currentStep === steps.length ? (
                    <Button
                      onClick={handleSubmit}
                      className="bg-rose-500 hover:bg-rose-600 flex items-center space-x-2"
                    >
                      <span>Submit Property</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-rose-500 hover:bg-rose-600 flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeHost;
