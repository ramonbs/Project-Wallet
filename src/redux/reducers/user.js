import { USER_ADD } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
  password: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_ADD:
    return {
      ...state,
      [action.name]: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
