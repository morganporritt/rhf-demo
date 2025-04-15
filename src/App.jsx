import { useForm } from 'react-hook-form';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import './App.css';

function App() {
  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    watch: watchLogin,
    reset: resetLogin
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmitLogin = (data) => {
    console.log('Login form submitted:', data);
    alert('Login form submitted successfully! Check console for details.');
    resetLogin();
  };

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm({
    defaultValues: {
      username: '',
      age: '',
      website: '',
      phone: ''
    }
  });

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const validateUsername = async (value) => {
    setIsCheckingUsername(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCheckingUsername(false);
    // Simulate username check (for demo, usernames containing 'taken' are considered unavailable)
    return !value.toLowerCase().includes('taken') || 'Username is already taken';
  };

  const onSubmitProfile = (data) => {
    console.log('Profile form submitted:', data);
    alert('Profile form submitted successfully! Check console for details.');
    resetProfile();
  };

  const password = watchLogin('password');

  const codeSnippet = `// React Hook Form Login Example
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

  const profileCodeSnippet = `// React Hook Form Profile Example with Async Validation
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const validateUsername = async (value) => {
    setIsCheckingUsername(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCheckingUsername(false);
    // Usernames containing 'taken' are considered unavailable
    return !value.toLowerCase().includes('taken') || 'Username is already taken';
  };

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username field with async validation */}
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
      </div>

      {/* Age field with number validation */}
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
      </div>

      {/* Website field with URL validation */}
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
      </div>

      {/* Phone field with format validation */}
      <div className="form-group">
        <label>Phone:</label>
        <input
          {...register('phone', {
            pattern: {
              value: /^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$/,
              message: 'Phone number must be in format (XXX) XXX-XXXX'
            },
            validate: {
              validArea: (value) => {
                if (!value) return true;
                const areaCode = value.match(/\\d{3}/)?.[0];
                return !areaCode?.startsWith('0') || 'Area code cannot start with 0'
              }
            }
          })}
          placeholder="(123) 456-7890"
        />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>

      <button type="submit" className="submit-btn">Submit Profile</button>
    </form>
  );
}`;

  return (
    <>
      <h1>React Hook Form Demo</h1>
      <div className="page-container">
        <div className="form-container">
          <h2>Login Example</h2>
          <h3>Basic validation</h3>
          <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
            {/* Email field with validation */}
            <div className="form-group">
              <label>Email:</label>
              <input
                {...registerLogin('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {loginErrors.email && <span className="error">{loginErrors.email.message}</span>}
              <p className="field-description">
                This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#options" target="_blank">pattern validation</a> using a regex pattern for email format,
                and <a href="https://react-hook-form.com/docs/useform/register#rules" target="_blank">required field validation</a> using React Hook Form's built-in validators.
              </p>
            </div>

            {/* Password field with validation */}
            <div className="form-group">
              <label>Password:</label>
              <input
                type="text"
                {...registerLogin('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {loginErrors.password && <span className="error">{loginErrors.password.message}</span>}
              <p className="field-description">
                This field shows how to implement <a href="https://react-hook-form.com/docs/useform/register#minLength" target="_blank">minimum length validation</a> using React Hook Form's minLength validator.
              </p>
            </div>

            {/* Confirm Password field with custom validation */}
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="text"
                {...registerLogin('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match'
                })}
              />
              {loginErrors.confirmPassword && (
                <span className="error">{loginErrors.confirmPassword.message}</span>
              )}
              <p className="field-description">
                This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> using the validate function
                and real-time form watching with the <a href="https://react-hook-form.com/docs/useform/watch" target="_blank">watch()</a> hook to match passwords.
              </p>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight
              theme={themes.dracula}
              code={codeSnippet}
              language="jsx"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      <span className="line-number">{i + 1}</span>
                      <span className="line-content">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="page-container" style={{ marginTop: '32px' }}>
        <div className="form-container">
          <h2>Profile Example</h2>
          <h3>More validation & async validation</h3>
          <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
            {/* Username field with async validation */}
            <div className="form-group">
              <label>Username:</label>
              <input
                {...registerProfile('username', {
                  required: 'Username is required',
                  validate: validateUsername
                })}
              />
              {isCheckingUsername && <span className="info">Checking username availability...</span>}
              {profileErrors.username && <span className="error">{profileErrors.username.message}</span>}
              <p className="field-description">
                This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">async validation</a> by simulating an API call to check username availability.
                Try using a username containing the word 'taken' to see the validation in action.
              </p>
            </div>

            {/* Age field with number validation */}
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                {...registerProfile('age', {
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
              {profileErrors.age && <span className="error">{profileErrors.age.message}</span>}
              <p className="field-description">
                This field shows multiple numeric validations: <a href="https://react-hook-form.com/docs/useform/register#min" target="_blank">minimum</a> and <a href="https://react-hook-form.com/docs/useform/register#max" target="_blank">maximum</a> values,
                and <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> to ensure the value is a whole number.
              </p>
            </div>

            {/* Website field with URL validation */}
            <div className="form-group">
              <label>Website:</label>
              <input
                {...registerProfile('website', {
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
              {profileErrors.website && <span className="error">{profileErrors.website.message}</span>}
              <p className="field-description">
                This field demonstrates <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom URL validation</a>. The field is optional,
                but if filled, must be a valid URL starting with http:// or https://.
              </p>
            </div>

            {/* Phone field with format validation */}
            <div className="form-group">
              <label>Phone:</label>
              <input
                {...registerProfile('phone', {
                  pattern: {
                    value: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
                    message: 'Phone number must be in format (XXX) XXX-XXXX'
                  },
                  validate: {
                    validArea: (value) => {
                      if (!value) return true;
                      const areaCode = value.match(/\d{3}/)?.[0];
                      return !areaCode?.startsWith('0') || 'Area code cannot start with 0'
                    }
                  }
                })}
                placeholder="(123) 456-7890"
              />
              {profileErrors.phone && <span className="error">{profileErrors.phone.message}</span>}
              <p className="field-description">
                This field shows <a href="https://react-hook-form.com/docs/useform/register#pattern" target="_blank">pattern validation</a> for phone numbers and <a href="https://react-hook-form.com/docs/useform/register#validate" target="_blank">custom validation</a> for area codes.
                The field is optional but must match the format if provided.
              </p>
            </div>

            <button type="submit" className="submit-btn">Submit Profile</button>
          </form>
        </div>
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight
              theme={themes.dracula}
              code={profileCodeSnippet}
              language="jsx"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      <span className="line-number">{i + 1}</span>
                      <span className="line-content">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
