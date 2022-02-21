// type
type StoreState = { counter: number };
type Action = { type: 'INCREMENT' | 'DECREMENT' | 'RESET' };

// Action type
const inc = 'INCREMENT';
const dec = 'DECREMENT';
const reset = 'RESET';

// Action
const incAction = () => ({ type: inc });
const decAction = () => ({ type: dec });
const resetAction = () => ({ type: reset });

// Initial state
const initState: StoreState = { counter: 0 };

// reducer
const reducer = (state = initState, { type }: Action) => {
  if (type === inc) return { ...state, counter: state.counter + 1 };
  if (type === dec) return { ...state, counter: state.counter - 1 };
  if (type === reset) return { ...state, counter: 0 };
  return state;

};

// "store"
// const [state, dispatch] = useReducer(reducer, initState);
