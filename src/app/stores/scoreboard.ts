import { Action, createAction, createReducer, on, props } from '@ngrx/store';

import { Scoreboard } from '../types/scoreboard.interface';

// actions
const awayScore = createAction('[Scoreboard Page] Away Score');
const homeScore = createAction('[Scoreboard Page] Home Score');
const resetScore = createAction('[Scoreboard Page] Score Reset');
const setScores = createAction(
  '[Scoreboard Page] Set Scores',
  props<{ game: Scoreboard }>()
);

const actions = { awayScore, homeScore, resetScore, setScores };

// initial state
const initialState: Scoreboard = {
  home: 0,
  away: 0,
};

// reducer
const _scoreboardReducer = createReducer(
  initialState,
  on(actions.homeScore, (state) => ({
    ...state,
    home: state.home + 1,
  })),
  on(actions.awayScore, (state) => ({
    ...state,
    away: state.away + 1,
  })),
  on(actions.resetScore, (_state) => ({ home: 0, away: 0 })),
  on(actions.setScores, (_state, { game: { home, away } }) => ({
    home,
    away,
  }))
);

const reducer = (state: Scoreboard | undefined, action: Action) =>
  _scoreboardReducer(state, action);

const featureKey = 'game';

export { actions, featureKey, initialState, reducer };
