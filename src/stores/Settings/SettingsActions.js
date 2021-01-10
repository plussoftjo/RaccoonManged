import SettingsType from './SettingsType';



export const setLocale = (item) => {
  return {
    type:SettingsType.SET_LOCALE,
    payload:item
  }
}