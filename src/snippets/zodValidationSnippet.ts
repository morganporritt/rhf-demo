export const zodValidationSnippet = `// Zod Validation Example
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema with Zod
const userSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z.string()
    .email('Invalid email address')
    .refine(val => !val.includes('test'), 'Test emails are not allowed'),
  
  age: z.number()
    .min(18, 'Must be at least 18 years old')
    .max(120, 'Invalid age'),
  
  website: z.string()
    .url('Invalid URL')
    .optional()
    .nullable()
    .refine(
      (val) => !val || val.startsWith('https://'),
      'Website must use HTTPS'
    ),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Infer TypeScript type from schema
type UserFormData = z.infer<typeof userSchema>;

function ZodValidationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label>Username:</label>
        <input {...register('username')} placeholder="Enter username" />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input {...register('email')} placeholder="Enter email" />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input 
          type="number" 
          {...register('age', { valueAsNumber: true })}
          placeholder="Enter age"
        />
        {errors.age && (
          <span className="error">{errors.age.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Website (optional):</label>
        <input {...register('website')} placeholder="https://example.com" />
        {errors.website && (
          <span className="error">{errors.website.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input 
          type="password" 
          {...register('password')}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Confirm Password:</label>
        <input 
          type="password" 
          {...register('confirmPassword')}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`;
