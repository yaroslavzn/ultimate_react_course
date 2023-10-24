import React, { useState } from 'react';

const Options = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState(null);

  const hasAnswered = answer != null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        let classes = 'btn btn-option';

        if (hasAnswered && index === question.correctOption) {
          classes += ' correct';
        } else if (hasAnswered && index !== question.correctOption) {
          classes += ' wrong';
        }

        if (hasAnswered && index === answer) {
          classes += ' answer';
        }

        return (
          <button
            className={classes}
            disabled={hasAnswered}
            key={option}
            onClick={() => {
              onAnswer(question, index);
              setAnswer(index);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
