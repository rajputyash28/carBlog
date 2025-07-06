'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ramesh",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
      testimonial: "This car blog has been invaluable in helping me choose my new electric vehicle. The detailed reviews and honest comparisons saved me thousands of dollars and helped me find the perfect car for my needs.",
      rating: 5
    },
    {
      id: 2,
      name: "Shah rukh",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      testimonial: "The maintenance tips section is a goldmine! I've learned so much about caring for my BMW that I've extended its lifespan significantly. The step-by-step guides are easy to follow and have saved me hundreds in mechanic fees.",
      rating: 5
    },
    {
      id: 3,
      name: "Sitara",
      location: "Miami, FL",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      testimonial: "As a first-time car buyer, this blog was my go-to resource. The buying guides, financing tips, and safety ratings helped me navigate the complex world of car purchasing with confidence. Highly recommended!",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-8 md:py-16 bg-[#232536] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#FF5959]">TESTIMONIALS</h2>
          <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">What people say about our blog</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
            Join thousands of satisfied readers who trust our automotive expertise to guide their car-related decisions. Here's what our community has to say about their experience.
          </p>

          {/* Testimonial Content */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm md:text-base">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-300 text-xs md:text-sm">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial 
                    ? 'bg-[#FF5959]' 
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}