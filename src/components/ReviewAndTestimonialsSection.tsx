
import React, { useState } from 'react';
import TestimonialsSection from './TestimonialsSection';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, MessageSquare } from 'lucide-react';

const ReviewAndTestimonialsSection = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // You could add a refresh mechanism here if needed
  };

  return (
    <div className="space-y-8">
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Review Form Section */}
      <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(236,72,153,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(219,39,119,0.03),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {!showReviewForm ? (
            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                Share Your Experience
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                Have you stayed with us? We'd love to hear about your experience and any suggestions you might have!
              </p>
              <Button
                onClick={() => setShowReviewForm(true)}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <MessageSquarePlus className="mr-2 h-5 w-5" />
                Write a Review
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <Button
                  onClick={() => setShowReviewForm(false)}
                  variant="outline"
                  className="mb-6"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Back to Testimonials
                </Button>
              </div>
              <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewAndTestimonialsSection;
