import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function changeStepHandler(changeTo) {
    setStep(changeTo);
  }

  return (
    <>
      <button className="close" onClick={() => setIsActive(!isActive)}>
        &times;
      </button>
      {isActive && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 0 ? 'active' : null}`}>1</div>
            <div className={`${step >= 1 ? 'active' : null}`}>2</div>
            <div className={`${step >= 2 ? 'active' : null}`}>3</div>
          </div>

          <StepMessage step={step + 1}>{messages[step]}</StepMessage>

          <div className="buttons">
            <Button
              className="previous"
              onClick={() => (step > 0 ? changeStepHandler(step - 1) : null)}
            >
              👈 Previous
            </Button>
            <Button
              className="next"
              onClick={() =>
                step < messages.length - 1 ? changeStepHandler(step + 1) : null
              }
            >
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ children, onClick, className }) {
  return <button onClick={onClick}>{children}</button>;
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      Step {step}: {children}
    </p>
  );
}

export default App;
