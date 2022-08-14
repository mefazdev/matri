import { combineReducers } from 'redux'
import * as types from './types'

const descEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__DESC__EDIT:
        return state =  true
      case types.CLOSE__DESC__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const relgsEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__RELGS__EDIT :
        return state =  true
      case types.CLOSE__RELGS__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const eduEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__EDU__EDIT:
        return state =  true
      case types.CLOSE__EDU__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const famEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__FAM__EDIT:
        return state =  true
      case types.CLOSE__FAM__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const locEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__LOC__EDIT:
        return state =  true
      case types.CLOSE__LOC__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const lookingEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__LOOKING__EDIT:
        return state =  true
      case types.CLOSE__LOOKING__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const physiEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__PHYSI__EDIT:
        return state =  true
      case types.CLOSE__PHYSI__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const basicEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__BASIC__EDIT:
        return state =  true
      case types.CLOSE__BASIC__EDIT :
        return state= false
      
      default:
        return state
    }
  }

  const searchControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__SEARCH:
        return state =  true
      case types.CLOSE__SEARCH :
        return state= false
      
      default:
        return state
    }
  }
  const loginControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__LOGIN:
        return state =  true
      case types.CLOSE__LOGIN :
        return state= false
      
      default:
        return state
    }
  }

  const photoEditControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__PHOTO__EDIT:
        return state =  true
      case types.CLOSE__PHOTO__EDIT :
        return state= false
      
      default:
        return state
    }
  }
  const profileHideControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__PROFILE__HIDE:
        return state =  true
      case types.CLOSE__PROFILE__HIDE :
        return state= false
      
      default:
        return state
    }
  }

  const profileDeleteControl = (state = false, { type }) => {
    switch (type) {
      case types.OPEN__PROFILE__DELETE:
        return state =  true
      case types.CLOSE__PROFILE__DELETE :
        return state= false
      
      default:
        return state
    }
  }
  const reducers= {
basicEditControl :basicEditControl,
   descEditControl : descEditControl,
   relgsEditControl :relgsEditControl,
   eduEditControl : eduEditControl,
   famEditControl : famEditControl,
locEditControl : locEditControl,
lookingEditControl: lookingEditControl,
physiEditControl:physiEditControl,
searchControl:searchControl,
loginControl:loginControl,
photoEditControl:photoEditControl,
profileHideControl:profileHideControl,
profileDeleteControl:profileDeleteControl,



  }


  export default combineReducers(reducers)