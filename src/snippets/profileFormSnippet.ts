export const profileFormSnippet = `// React Hook Form Profile Example
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function ProfileForm() {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const validateUsername = async (value) => {
    setIsCheckingUsername(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCheckingUsername(false);
    return !value.toLowerCase().includes('taken') || 'Username is already taken';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username field */}
      <input {...register('username', { validate: validateUsername })} />
      {isCheckingUsername && <span>Checking...</span>}

      {/* Age field */}
      <input type="number" {...register('age', {
        min: { value: 18, message: 'Must be 18+' },
        max: { value: 100, message: 'Max age 100' }
      })} />

      {/* Website field */}
      <input {...register('website', {
        validate: (value) => {
          if (!value) return true;
          try {
            new URL(value);
            return true;
          } catch {
            return 'Must be a valid URL';
          }
        }
      })} />

      {/* Phone field */}
      <input {...register('phone', {
        pattern: {
          value: /^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$/,
          message: 'Use (XXX) XXX-XXXX format'
        }
      })} />
    </form>
  );
}`;
