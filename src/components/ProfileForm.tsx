import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ProfileFormData {
  username: string;
  age: string;
  website: string;
  phone: string;
}

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: '',
      age: '',
      website: '',
      phone: ''
    }
  });

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const validateUsername = async (value: string) => {
    setIsCheckingUsername(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCheckingUsername(false);
    // Simulate username check (for demo, usernames containing 'taken' are considered unavailable)
    return !value.toLowerCase().includes('taken') || 'Username is already taken';
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile form submitted:', data);
    alert('Profile form submitted successfully! Check console for details.');
    reset();
  };

  return (
    <div className="form-container">
      <h2>Profile Example</h2>
      <h3>More validation & async validation</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username:</label>
          <input
            {...register('username', {
              required: 'Username is required',
              validate: validateUsername
            })}
          />
          {isCheckingUsername && <span className="info">Checking username availability...</span>}
          {errors.username && <span className="error">{errors.username.message}</span>}
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">async validation</a> by simulating an API call to check username availability.
            Try using a username containing the word 'taken' to see the validation in action.
          </p>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            {...register('age', {
              required: 'Age is required',
              min: {
                value: 18,
                message: 'Must be at least 18 years old'
              },
              max: {
                value: 100,
                message: 'Age cannot exceed 100'
              },
              validate: (value) => Number.isInteger(Number(value)) || 'Age must be a whole number'
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
          <p className="field-description">
            This field shows multiple numeric validations: <a href="https://react-hook-form.com/docs/useform/register#min" target="_blank">minimum</a> and <a href="https://react-hook-form.com/docs/useform/register#max" target="_blank">maximum</a> values,
            and <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> to ensure the value is a whole number.
          </p>
        </div>

        <div className="form-group">
          <label>Website:</label>
          <input
            {...register('website', {
              validate: (value) => {
                if (!value) return true;
                try {
                  new URL(value);
                  return true;
                } catch {
                  return 'Must be a valid URL starting with http:// or https://';
                }
              }
            })}
            placeholder="https://example.com"
          />
          {errors.website && <span className="error">{errors.website.message}</span>}
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom URL validation</a>. The field is optional,
            but if filled, must be a valid URL.
          </p>
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            {...register('phone', {
              pattern: {
                value: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
                message: 'Phone number must be in format (XXX) XXX-XXXX'
              },
              validate: {
                validArea: (value) => {
                  if (!value) return true;
                  const areaCode = value.match(/\d{3}/)?.[0];
                  return !areaCode?.startsWith('0') || 'Area code cannot start with 0';
                }
              }
            })}
            placeholder="(123) 456-7890"
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
          <p className="field-description">
            This field shows <a href="https://react-hook-form.com/docs/useform/register#pattern" target="_blank">pattern validation</a> for phone numbers and <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> for area codes.
            The field is optional but must match the format if provided.
          </p>
        </div>

        <button type="submit" className="submit-btn">Submit Profile</button>
      </form>
    </div>
  );
}
