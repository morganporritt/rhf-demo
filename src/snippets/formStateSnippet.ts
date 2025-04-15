export const formStateSnippet = `// React Hook Form Form State Example
import { useForm } from 'react-hook-form';

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
    }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      bio: ''
    }
  });

  const onSubmit = async (data) => {
    await submitForm(data); // Your API call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('username', { required: true })} />
        <p>Field is dirty: {dirtyFields.username ? 'Yes' : 'No'}</p>
        <p>Field was touched: {touchedFields.username ? 'Yes' : 'No'}</p>
      </div>

      <div>
        <input
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i
          })}
        />
        {errors.email && <span>Invalid email</span>}
      </div>

      <div>
        <textarea {...register('bio')} />
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      <div>
        <p>Form is dirty: {isDirty ? 'Yes' : 'No'}</p>
        <p>Form is valid: {isValid ? 'Yes' : 'No'}</p>
        <p>Form is submitting: {isSubmitting ? 'Yes' : 'No'}</p>
      </div>
    </form>
  );
}`;
