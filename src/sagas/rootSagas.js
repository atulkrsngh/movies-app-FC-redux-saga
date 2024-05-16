import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addMovieSearchResult } from '../actions';

// Saga worker function to handle fetching movie data from the API
function* handleMovieSearch(action) {
  const { searchText } = action;
  const url = `https://www.omdbapi.com/?apikey=3ca5df7&t=${searchText}`;

  try {
    const response = yield call(fetch, url);
    const movie = yield response.json();
    yield put(addMovieSearchResult(movie));
  } catch (error) {
    // Handle error
    console.error('Error fetching movie:', error);
  }
}

// Saga watcher function
function* watchMovieSearch() {
  yield takeLatest('HANDLE_MOVIE_SEARCH', handleMovieSearch);
}

export default function* rootSaga() {
  yield all([
    watchMovieSearch(),
    // Add other watcher functions here if needed
  ]);
}

/*

all() is an effect creator, which tells the saga to run all sagas passed to it concurrently and to wait for them all to complete. 
We pass an array of sagas that encapsulates our domain logic.

put: Dispatches an action to the Redux store.

If there are multiple requests, takeEvery will start multiple instances of the worker saga; in other words, it handles concurrency for you.

takeEvery: Listens for every action of a certain type and triggers a worker saga each time.

takeLatest: Similar to takeEvery, but only runs the latest saga and cancels any previous sagas if multiple actions of the same type 
are dispatched quickly. takeLatest helps the watcher saga to look for action (HANDLE_MOVIE_SEARCH) and when it sees that action dispatched, 
it will run a handler function

call: Calls a function or a promise. It's useful for performing synchronous or asynchronous tasks outside of sagas.

select: Retrieves data from the Redux store state.

all: Runs multiple sagas concurrently.

*/