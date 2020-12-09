
export const userReducer = (state : {username : null | string} , action : {type : 'SET_USER' , username : string | null}) => {
    switch (action.type) {
      case 'SET_USER':
        return {
            ...state , 
            username : action.username
        }
    }
  }