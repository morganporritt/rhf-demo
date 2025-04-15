import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { SubmittedData } from './SubmittedData';

interface ControlledFormData {
  firstName: string;
  lastName: string;
  title: 'mr' | 'mrs' | 'miss' | 'dr';
  newsletter: boolean;
  interests: string[];
}

export function ControlledForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ControlledFormData>({
    defaultValues: {
      firstName: 'JOHN',
      lastName: 'DOE',
      title: 'mr',
      newsletter: true,
      interests: ['sports', 'music']
    }
  });

  const [submittedData, setSubmittedData] = useState<ControlledFormData | null>(null);

  const onSubmit = (data: ControlledFormData) => {
    console.log('Controlled form submitted:', data);
    setSubmittedData(data);
    reset();
  };

  return (
    <div className="form-container">
      <h2>Controlled Inputs Example</h2>
      <h3>Using Controller Component</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title:</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <select {...field} className="select-input">
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="miss">Miss</option>
                <option value="dr">Dr.</option>
              </select>
            )}
          />
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/usecontroller/controller" target="_blank">controlled select input</a> using the Controller component.
          </p>
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="First Name"
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                }}
              />
            )}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/usecontroller/controller#rules" target="_blank">controlled text input</a> with value transformation (uppercase).
          </p>
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Last Name"
                onChange={(e) => {
                  field.onChange(e.target.value.toUpperCase());
                }}
              />
            )}
          />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
          <p className="field-description">
            Another example of controlled input with the same uppercase transformation.
          </p>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
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
            Subscribe to newsletter
          </label>
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/usecontroller/controller#checkbox" target="_blank">controlled checkbox input</a>.
          </p>
        </div>

        <div className="form-group checkbox-group">
          <label>Interests:</label>
          <Controller
            name="interests"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="checkbox-list">
                {['Sports', 'Music', 'Reading'].map((interest) => (
                  <label key={interest} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={value.includes(interest.toLowerCase())}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const interestValue = interest.toLowerCase();
                        if (checked) {
                          onChange([...value, interestValue]);
                        } else {
                          onChange(value.filter(item => item !== interestValue));
                        }
                      }}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            )}
          />
          <p className="field-description">
            This field demonstrates <a href="https://react-hook-form.com/docs/usecontroller/controller#multiple" target="_blank">controlled multiple checkboxes</a> with array state management.
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
