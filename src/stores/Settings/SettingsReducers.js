import SettingsType from './SettingsType'

const intintalState = {
  locale:{
    lang:'',
    rtl:false
  },
  dev:""
};


const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case SettingsType.SET_LOCALE:
      return {...state,locale:action.payload}
    case SettingsType.SET_DEV:
      return {...state,dev:action.payload}
    default:
      return state;
  }
};

export default reducer;