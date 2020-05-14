import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
};

const INGREDIENTS_COSTS = {
  salad: 0.5,
  meat: 1.7,
  bacon: 1,
  cheese: 0.9,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]:
            state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_COSTS[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]:
            state.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_COSTS[action.ingredientName],
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: {
            salad: action.ingredients.salad,
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
          },
          totalPrice: 5,
          error: false,
        };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
          return {
            ...state,
            error: true
          }
    default:
      return state;
  }
};

export default reducer;
