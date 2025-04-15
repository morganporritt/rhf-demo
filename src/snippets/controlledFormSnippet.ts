export const controlledFormSnippet = `// React Hook Form Controlled Inputs Example
import { useForm, Controller } from 'react-hook-form';

function ControlledForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      title: 'mr',
      newsletter: true,
      interests: ['sports', 'music']
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Controller with Select */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <select {...field}>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="miss">Miss</option>
            <option value="dr">Dr.</option>
          </select>
        )}
      />

      {/* Controller with Input */}
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <input
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value.toUpperCase());
            }}
          />
        )}
      />

      {/* Controller with Checkbox */}
      <Controller
        name="newsletter"
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        )}
      />

      {/* Controller with Multiple Checkboxes */}
      <Controller
        name="interests"
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            {['sports', 'music', 'reading'].map((interest) => (
              <input
                key={interest}
                type="checkbox"
                checked={value.includes(interest)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    onChange([...value, interest]);
                  } else {
                    onChange(value.filter(item => item !== interest));
                  }
                }}
              />
            ))}
          </>
        )}
      />
    </form>
  );
}`;
