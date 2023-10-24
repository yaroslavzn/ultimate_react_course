import React from 'react';
import Options from './Options';

const Question = ({ question, onAnswer }) => {
  return (
    <div>
      <h4>{question.question}</h4>

      <Options question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default Question;
