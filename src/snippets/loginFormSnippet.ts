export const loginFormSnippet = `// React Hook Form Login Example
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email field */}
      <div className="form-group">
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      {/* Password field */}
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      {/* Confirm Password field */}
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
}`;
