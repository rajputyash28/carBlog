import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(4, 'Message must be at least 4 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;