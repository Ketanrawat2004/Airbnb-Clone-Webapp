import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrainSearchForm from '@/components/train/TrainSearchForm';
import { Train } from 'lucide-react';

const TrainSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-up">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
              <Train className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Book Train Tickets
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Search and book train tickets across India with ease. Real-time availability and instant booking confirmation.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <TrainSearchForm />
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎫</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Booking</h3>
            <p className="text-sm text-gray-600">Book tickets instantly with confirmed seats</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">BNB Coins</h3>
            <p className="text-sm text-gray-600">Save money with BNB coin rewards</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">Safe and secure payment options</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Tickets</h3>
            <p className="text-sm text-gray-600">Get tickets on your mobile instantly</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TrainSearch;
