import SocialType from './SocialType'

const intintalState = {
  explorPosts:[],
  post:{},
  profile:{}
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case SocialType.SET_EXPLOR_POSTS:
      return { ...state, explorPosts: action.payload };
    case SocialType.SET_POST:
      return {...state,post:action.payload}
    case SocialType.SET_PROFILE:
      return {...state,profile:action.payload}
    default:
      return state;
  }
};

export default reducer;
