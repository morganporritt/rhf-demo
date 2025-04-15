export const formStateSnippet = `// React Hook Form Form State Example
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormStateData {
  username: string;
  email: string;
  bio: string;
}

function FormStateExample() {
  const {
    register,
    handleSubmit,
    formState: {
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitting,
      isValid,
      errors
    },
    reset
  } = useForm<FormStateData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      bio: ''
    }
  });

  const [submittedData, setSubmittedData] = useState<FormStateData | null>(null);

  const onSubmit = async (data: FormStateData, e: React.BaseSyntheticEvent | undefined) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form state example submitted:', data);
      setSubmittedData(data);
      reset();
      e?.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Form State Example</h2>
      <h3>Using formState Hook</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Username:</label>
          <input
            {...register('username', { 
              required: 'Username is required',
              minLength: {
                value: 8,
                message: 'Username must be at least 8 characters'
              }
            })}
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              },
              validate: (value) => {
                if (value.toLowerCase().includes('test')) {
                  return 'Test emails are not allowed';
                }
                return true;
              }
            })}
            placeholder="Enter email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            {...register('bio', {
              maxLength: {
                value: 500,
                message: 'Bio cannot exceed 500 characters'
              }
            })}
            placeholder="Enter bio (optional)"
            rows={4}
          />
          {errors.bio && (
            <span className="error">{errors.bio.message}</span>
          )}
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              reset();
              setSubmittedData(null);
            }}
          >
            Reset Form
          </button>
        </div>

        <div className="form-status">
          <div className="status-row">
            <span>Form Errors:</span>
            {Object.entries(errors).map(([field, error]) => (
              <span key={field} className="touched-indicator">
                {field}: {error.message}
              </span>
            ))}
          </div>
          <div className="status-row">
            <span>Dirty Fields:</span>
            {Object.keys(dirtyFields).map((field) => (
              <span key={field} className="touched-indicator">
                {field}
              </span>
            ))}
          </div>
          <div className="status-row">
            <span>Touched Fields:</span>
            {Object.keys(touchedFields).map((field) => (
              <span key={field} className="touched-indicator">
                {field}
              </span>
            ))}
          </div>
          <div className="status-row">
            <span>isValid:</span>
            {isValid ? (
              <span className="touched-indicator green">Yes</span>
            ) : (
              <span className="touched-indicator">No</span>
            )}
          </div>
          <div className="status-row">
            <span>isSubmitting:</span>
            {isSubmitting ? (
              <span className="touched-indicator green">Yes</span>
            ) : (
              <span className="touched-indicator">No</span>
            )}
          </div>
        </div>
      </form>
      {submittedData && (
        <div className="submitted-data">
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <button className="clear-btn" onClick={() => setSubmittedData(null)}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}`;
