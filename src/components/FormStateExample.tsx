import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SubmittedData } from './SubmittedData';

interface FormStateData {
  username: string;
  email: string;
  bio: string;
}

export function FormStateExample() {
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
      <p className="field-description">
        This example demonstrates the <a href="https://react-hook-form.com/docs/useform/formstate" target="_blank">formState</a> hook
        which provides real-time tracking of form state, including field status, validation, and submission state.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Username:</label>
          <p className="field-description">
            Demonstrates <a href="https://react-hook-form.com/docs/useform/register" target="_blank">required field validation</a> and
            <a href="https://react-hook-form.com/docs/useform/register#registerminLength" target="_blank"> minimum length validation</a>.
            Try entering different lengths to see validation in action.
          </p>
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
          <p className="field-description">
            Shows <a href="https://react-hook-form.com/docs/useform/register#registerpattern" target="_blank">pattern validation</a> for
            email format and <a href="https://react-hook-form.com/docs/useform/register#registervalidate" target="_blank"> custom validation </a> 
             (try using an email containing 'test').
          </p>
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
          <p className="field-description">
            Optional field with <a href="https://react-hook-form.com/docs/useform/register#registermaxLength" target="_blank">maximum length validation</a>.
            Try exceeding 500 characters to see the validation error.
          </p>
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
          <p className="field-description">
            The form state panel below shows real-time updates of the form's state. Learn more about
            <a href="https://react-hook-form.com/docs/useform/formstate#formStateisdirty" target="_blank">isDirty</a>,
            <a href="https://react-hook-form.com/docs/useform/formstate#formStatedirtyFields" target="_blank">dirtyFields</a>,
            <a href="https://react-hook-form.com/docs/useform/formstate#formStatetouchedFields" target="_blank">touchedFields</a>, and
            <a href="https://react-hook-form.com/docs/useform/formstate#formStateisValid" target="_blank">isValid</a>.
          </p>

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
      <SubmittedData 
        data={submittedData} 
        onClear={() => setSubmittedData(null)} 
      />
    </div>
  );
}
