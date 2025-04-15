import { Highlight, themes } from 'prism-react-renderer';
import { LoginForm } from './components/LoginForm';
import { ProfileForm } from './components/ProfileForm';
import { ControlledForm } from './components/ControlledForm';
import { FormStateExample } from './components/FormStateExample';
import { loginFormSnippet } from './snippets/loginFormSnippet';
import { controlledFormSnippet } from './snippets/controlledFormSnippet';
import { profileFormSnippet } from './snippets/profileFormSnippet';
import { formStateSnippet } from './snippets/formStateSnippet';
import './App.css';

import { useEffect } from 'react';

function App() {
  const updateFormHeight = () => {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach((form, index) => {
      const height = form.getBoundingClientRect().height;
      const codeContainer = document.querySelectorAll('.code-container')[index] as HTMLElement;
      if (codeContainer) {
        codeContainer.style.setProperty('--form-height', `${height}px`);
      }
    });
  };

  useEffect(() => {
    // Initial measurement
    updateFormHeight();

    // Measure after a short delay to account for any animations/transitions
    const timeout = setTimeout(updateFormHeight, 100);

    // Measure on window resize
    window.addEventListener('resize', updateFormHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateFormHeight);
      clearTimeout(timeout);
    };
  }, []);

  // Re-measure when form content might change
  useEffect(() => {
    const observer = new MutationObserver(updateFormHeight);
    const forms = document.querySelectorAll('.form-container');
    
    forms.forEach(form => {
      observer.observe(form, {
        subtree: true,
        childList: true,
        characterData: true
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1>React Hook Form Demo</h1>
      <div className="documentation-links">
        <h2>Important Links & Documentation</h2>
        <ul>
          <li>
            <a href="https://react-hook-form.com/" target="_blank">React Hook Form Official Website</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/get-started" target="_blank">Getting Started Guide</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/docs" target="_blank">API Documentation</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/form-builder" target="_blank">Form Builder</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/dev-tools" target="_blank">DevTools</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/faqs" target="_blank">FAQs</a>
          </li>
          <li>
            <a href="https://github.com/react-hook-form/react-hook-form" target="_blank">GitHub Repository</a>
          </li>
        </ul>
      </div>

      {/* Login Form */}
      <div className="page-container">
        <LoginForm />
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight theme={themes.dracula} code={loginFormSnippet} language="tsx">
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
        <ProfileForm />
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight theme={themes.dracula} code={profileFormSnippet} language="tsx">
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

      {/* Controlled Inputs */}
      <div className="page-container" style={{ marginTop: '32px' }}>
        <ControlledForm />
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight theme={themes.dracula} code={controlledFormSnippet} language="tsx">
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

      {/* Form State Example */}
      <div className="page-container" style={{ marginTop: '32px' }}>
        <FormStateExample />
        <div className="code-container">
          <h2>Code Implementation</h2>
          <div className="code-block">
            <Highlight theme={themes.dracula} code={formStateSnippet} language="tsx">
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
