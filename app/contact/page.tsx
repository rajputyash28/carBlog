'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import SuccessMessage from '@/components/ui/SuccessMessage';

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange' // Enable real-time validation
  });

  // Watch all form fields for real-time validation
  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowSuccess(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage 
          message="Message sent successfully! We'll get back to you soon." 
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to get in touch? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name *"
                placeholder="Your full name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                type="email"
                label="Email *"
                placeholder="your.email@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Subject *"
                placeholder="What's this about?"
                error={errors.subject?.message}
                {...register('subject')}
              />

              <Textarea
                label="Message *"
                rows={6}
                placeholder="Tell us what you're thinking..."
                error={errors.message?.message}
                {...register('message')}
              />

              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Get in touch</h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">carBlog@gmail.com</p>
                  <p className="text-sm text-gray-500">Send us an email anytime!</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">001 2345 442</p>
                  <p className="text-sm text-gray-500">Mon-Fri from 8am to 5pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">Noida Sector-59 Appinventiv Office </p>
                  <p className="text-sm text-gray-500">Visit our office</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Why Contact Us?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Questions about our car reviews</li>
                <li>• Suggestions for new content</li>
                <li>• Partnership opportunities</li>
                <li>• Technical support</li>
                <li>• General feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}