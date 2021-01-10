import UserType from "./UserType";

const intintalState = {
  user: {},
  auth: false,
  steps: 0,
  coinsLogs: [],
  todayCoins: 0,
  coins: 0,
  posts: [],
  counts: {
    follows: 0,
    followers: 0,
  },
  socialTasks: {
    todayFollowPersion: false,
    todayMakePost: false,
    todayMakeComment: false,
  },
  orders: [],
  order: {},
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case UserType.SET_USER:
      return {
        ...state,
        user: action.payload,
        auth: true,
        coins: action.payload.coins.coin,
      };
    case UserType.SET_STEPS:
      return { ...state, steps: action.payload };
    case UserType.SET_COINS_LOGS:
      return { ...state, coinsLogs: action.payload };
    case UserType.SET_TODAY_COINS:
      return { ...state, todayCoins: action.payload };
    case UserType.SET_COINS:
      return { ...state, coins: action.payload };
    case UserType.SET_POSTS:
      return { ...state, posts: action.payload };
    case UserType.SET_COUNTS:
      return { ...state, counts: action.payload };
    case UserType.SET_SOCIAL_TASKS:
      return { ...state, socialTasks: action.payload };
    case UserType.SET_ORDERS:
      return { ...state, orders: action.payload };
    case UserType.SET_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

export default reducer;
