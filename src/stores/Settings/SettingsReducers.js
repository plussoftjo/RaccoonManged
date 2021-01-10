import SettingsType from './SettingsType'

const intintalState = {
  locale:{
    lang:'',
    rtl:false
  }
};


const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case SettingsType.SET_LOCALE:
      return {...state,locale:action.payload}
    default:
      return state;
  }
};

export default reducer;