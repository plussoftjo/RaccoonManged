import UserReducers from './User/UserReducers'
import SettingsReducers from './Settings/SettingsReducers'
import SocialReducers from './Social/SocialReducers'
import PrizesReducers from './Prizes/PrizesReducers'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  user: UserReducers,
  settings:SettingsReducers,
  social:SocialReducers,
  prizes:PrizesReducers
});

export default rootReducer;