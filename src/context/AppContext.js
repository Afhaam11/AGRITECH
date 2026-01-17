import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  currentPage: 'home',
  detectionHistory: [],
  isLoading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_DETECTION_RESULT':
      return { ...state, detectionHistory: [action.payload, ...state.detectionHistory] };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch,
    actions: {
      setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
      setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
      addDetectionResult: (result) => dispatch({ type: 'ADD_DETECTION_RESULT', payload: result })
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
