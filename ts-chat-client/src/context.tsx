import React , { createContext, useReducer } from 'react';
import { userReducer } from './reducer'

type InitialStateType = {
    username : string | null
  }
  
  const initialState = {
    username : null
  }

  export const AppContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<{type : 'SET_USER' , username : string | null}>;
  }>({
    state: initialState,
    dispatch: () => null
  });

  export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    return (
      <AppContext.Provider value={{state, dispatch}}>
        {children}
      </AppContext.Provider>
    )
  }
  
 