import PrizesType from './PrizesType'

export const setPrizesCategories = (item) => {
    return {
      type:PrizesType.SET_PRIZE_CATEGORIES,
      payload:item
    }
  }

  export const setSelectedCategory = (item) => {
    return {
      type:PrizesType.SET_SELECTED_CATEGORY,
      payload:item
    }
  }

  export const setSelectedSubCategory = (item) => {
    return {
      type:PrizesType.SET_SELECTED_SUB_CATEGORY,
      payload:item
    }
  }