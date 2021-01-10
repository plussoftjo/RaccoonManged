import UserType from './UserType'

export const setUser = (item) => {
  return {
    type:UserType.SET_USER,
    payload:item
  }
}

export const setSteps = (item) => {
  return {
    type:UserType.SET_STEPS,
    payload:item
  }
}

export const setCoinsLogs = (item) => {
  return {
    type:UserType.SET_COINS_LOGS,
    payload:item
  }
}

export const setTodayCoins = (item) => {
  return {
    type:UserType.SET_TODAY_COINS,
    payload:item
  }
}

export const setCoins = (item) => {
  return {
    type:UserType.SET_COINS,
    payload:item
  }
}

export const setPosts = (item) => {
  return {
    type:UserType.SET_POSTS,
    payload:item
  }
}

export const setCounts = (item) => {
  return {
    type:UserType.SET_COUNTS,
    payload:item
  }
}

export const setSocialTasks = (item) => {
  return {
    type:UserType.SET_SOCIAL_TASKS,
    payload:item
  }
}

export const setOrders = (item) => {
  return {
    type:UserType.SET_ORDERS,
    payload:item
  }
}

export const setOrder = (item) => {
  return {
    type:UserType.SET_ORDER,
    payload:item
  }
}