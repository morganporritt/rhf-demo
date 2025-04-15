import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SubmittedData } from './SubmittedData';

interface LoginFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  const [submittedData, setSubmittedData] = useState<LoginFormData | null>(null);

  const onSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
    setSubmittedData(data);
    reset();
  };

  return (
    <div className="form-container">
      <h2>Login Example</h2>
      <h3>Basic validation</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#options" target="_blank">pattern validation</a> using a regex pattern for email format,
            and <a href="https://react-hook-form.com/docs/useform/register#rules" target="_blank">required field validation</a> using React Hook Form's built-in validators.
          </p>
        </div>

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
          <p className="field-description">
            This field shows how to implement <a href="https://react-hook-form.com/docs/useform/register#minLength" target="_blank">minimum length validation</a> using React Hook Form's minLength validator.
          </p>
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> using the validate function
            and real-time form watching with the <a href="https://react-hook-form.com/docs/useform/watch" target="_blank">watch()</a> hook to match passwords.
          </p>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <SubmittedData 
        data={submittedData} 
        onClear={() => setSubmittedData(null)} 
      />
    </div>
  );
}
