import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import RestartButton from './components/RestartButton';
import FinishButton from './components/FinishButton';
import Footer from './components/Footer';
import Timer from './components/Timer';

const API_URL = 'http://localhost:3200';
const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: 'idle',
  currentQuestionIndex: 0,
  points: 0,
  alreadyAnswered: false,
  highscore: 0,
  secondsCountdown: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'pending': {
      return { ...state, status: 'pending' };
    }

    case 'rejected': {
      return { ...state, status: 'rejected' };
    }

    case 'resolved': {
      return { ...state, status: 'resolved', questions: payload };
    }

    case 'startQuiz': {
      return {
        ...state,
        status: 'started',
        secondsCountdown: state.questions.length * SECONDS_PER_QUESTION,
      };
    }

    case 'answer': {
      const points = state.points + payload.points;
      return {
        ...state,
        points,
        highscore: points > state.highscore ? points : state.highscore,
        alreadyAnswered: true,
      };
    }

    case 'nextQuestion': {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case 'finish': {
      return { ...state, status: 'finished' };
    }

    case 'restart': {
      return {
        ...initialState,
        status: 'started',
        questions: state.questions,
        secondsCountdown: state.questions.length * SECONDS_PER_QUESTION,
      };
    }

    case 'tick': {
      return {
        ...state,
        secondsCountdown: state.secondsCountdown - 1,
        status: state.secondsCountdown === 0 ? 'finished' : state.status,
      };
    }

    default: {
      throw new Error('Unsupported action type');
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    status,
    questions,
    currentQuestionIndex,
    points,
    alreadyAnswered,
    highscore,
    secondsCountdown,
  } = state;
  const numberOfQuestions = questions?.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const hasToShowNextButton =
    currentQuestionIndex < numberOfQuestions - 1 && alreadyAnswered;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchQuestions = async () => {
      try {
        dispatch({ type: 'pending' });
        const res = await fetch(`${API_URL}/questions`, {
          signal: abortController.signal,
        });
        const data = await res.json();

        dispatch({ type: 'resolved', payload: data });
      } catch (e) {
        if (e.name !== 'AbortError') {
          dispatch({ type: 'rejected' });
        }
      }
    };

    fetchQuestions();

    return () => abortController.abort();
  }, []);

  const onAnswerHandler = ({ correctOption, points }, answerIndex) => {
    const isCorrectAnswer = correctOption === answerIndex;

    dispatch({
      type: 'answer',
      payload: {
        points: isCorrectAnswer ? points : 0,
        showNextButton: true,
      },
    });
  };

  const onFinishQuizHandler = () => dispatch({ type: 'finish' });

  const onNextQuestionHandler = () => dispatch({ type: 'nextQuestion' });
  const onRestartQuizHandler = () => dispatch({ type: 'restart' });
  const onTickHandler = () => dispatch({ type: 'tick' });

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <Error />}
        {status === 'resolved' && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            onQuizStart={() => dispatch({ type: 'startQuiz' })}
          />
        )}
        {status === 'started' && (
          <>
            <Progress
              points={points}
              maxPoints={maxPoints}
              currIndex={currentQuestionIndex}
              maxIndex={numberOfQuestions}
              alreadyAnswered={alreadyAnswered}
            />
            <Question
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswer={onAnswerHandler}
            />
            <Footer>
              <Timer
                secondsCountdown={secondsCountdown}
                onTick={onTickHandler}
              />

              {hasToShowNextButton && (
                <NextButton onNextQuestion={onNextQuestionHandler} />
              )}
              {!hasToShowNextButton && alreadyAnswered && (
                <FinishButton onFinish={onFinishQuizHandler} />
              )}
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPointsNumber={maxPoints}
              highscore={highscore}
            />
            <RestartButton onRestart={onRestartQuizHandler} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
