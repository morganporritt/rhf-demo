import { useForm } from 'react-hook-form';

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
    defaultValues: {
      username: '',
      email: '',
      bio: ''
    }
  });

  const onSubmit = async (data: FormStateData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form state example submitted:', data);
    alert('Form state example submitted successfully! Check console for details.');
    reset();
  };

  return (
    <div className="form-container">
      <h2>Form State Example</h2>
      <h3>Using formState Hook</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username:</label>
          <input
            {...register('username', { required: 'Username is required' })}
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
          <div className="field-status">
            <span className={`status-indicator ${dirtyFields.username ? 'active' : ''}`}>
              Dirty
            </span>
            <span className={`status-indicator ${touchedFields.username ? 'active' : ''}`}>
              Touched
            </span>
          </div>
        </div>

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
            placeholder="Enter email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <div className="field-status">
            <span className={`status-indicator ${dirtyFields.email ? 'active' : ''}`}>
              Dirty
            </span>
            <span className={`status-indicator ${touchedFields.email ? 'active' : ''}`}>
              Touched
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            {...register('bio')}
            placeholder="Enter bio (optional)"
            rows={4}
          />
          <div className="field-status">
            <span className={`status-indicator ${dirtyFields.bio ? 'active' : ''}`}>
              Dirty
            </span>
            <span className={`status-indicator ${touchedFields.bio ? 'active' : ''}`}>
              Touched
            </span>
          </div>
        </div>

        <div className="form-status">
          <div className="status-row">
            <span className={`status-indicator ${isDirty ? 'active' : ''}`}>
              Form is Dirty
            </span>
            <span className={`status-indicator ${isValid ? 'active' : ''}`}>
              Form is Valid
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
