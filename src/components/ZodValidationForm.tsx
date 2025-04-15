import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the schema with Zod
const userSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z.string()
    .email('Invalid email address')
    .refine((val: string) => !val.includes('test'), 'Test emails are not allowed'),
  
  age: z.number()
    .min(18, 'Must be at least 18 years old')
    .max(120, 'Invalid age'),
  
  website: z.string()
    .url('Invalid URL')
    .optional()
    .nullable()
    .refine(
      (val: string | null) => !val || val.startsWith('https://'),
      'Website must use HTTPS'
    ),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string()
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Zod Validation Example</h2>
      <h3>Using Zod Schema Validation</h3>
      <p className="field-description">
        This example demonstrates <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod</a> schema validation with React Hook Form, including complex validation rules,
        cross-field validation, and custom refinements.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Username:</label>
          <p className="field-description">
            Must be 3-20 characters, containing only letters, numbers, and underscores.
          </p>
          <input {...register('username')} placeholder="Enter username" />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <p className="field-description">
            Must be a valid email address. Test emails are not allowed.
          </p>
          <input {...register('email')} placeholder="Enter email" />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <p className="field-description">
            Must be between 18 and 120.
          </p>
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
          <p className="field-description">
            If provided, must be a valid HTTPS URL.
          </p>
          <input {...register('website')} placeholder="https://example.com" />
          {errors.website && (
            <span className="error">{errors.website.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <p className="field-description">
            Must contain at least 8 characters, one uppercase letter, one number, and one special character.
          </p>
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
          <p className="field-description">
            Must match the password field above.
          </p>
          <input 
            type="password" 
            {...register('confirmPassword')}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ZodValidationForm;
