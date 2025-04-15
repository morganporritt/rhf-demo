import { Highlight, themes } from 'prism-react-renderer';

interface SubmittedDataProps {
  data: Record<string, any> | null;
  onClear: () => void;
}

export function SubmittedData({ data, onClear }: SubmittedDataProps) {
  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);

  return (
    <div className="submitted-data">
      <h4>Submitted Data:</h4>
      <div className="code-block">
        <Highlight
          theme={themes.dracula}
          code={jsonString}
          language="json"
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
      <button className="clear-btn" onClick={onClear}>Clear</button>
    </div>
  );
}
