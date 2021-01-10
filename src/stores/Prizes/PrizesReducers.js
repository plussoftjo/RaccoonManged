import PrizesType from "./PrizesType";

const intintalState = {
  prizesCategories: [],
  selectedCategory: {},
  selectedSubCategory: {},
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case PrizesType.SET_PRIZE_CATEGORIES:
      return { ...state, prizesCategories: action.payload };
    case PrizesType.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case PrizesType.SET_SELECTED_SUB_CATEGORY:
      return { ...state, selectedSubCategory: action.payload };
    default:
      return state;
  }
};

export default reducer;
