import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGINSTATE](state, loginstate) {
    state.loginState = loginstate
  },
  [types.SET_USERINFO](state, userinfo) {
    state.userInfo = userinfo
  },
  [types.SET_ADDRINFO](state, addrInfo) {
    state.addrInfo = addrInfo
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_PLAYINGRADIO_STATE](state, flag) {
    state.radioplaying = flag
  },
  [types.SET_MUTE_STATE](state, flag) {
    state.mute = flag
  },
  [types.SET_SIGN_STATE](state, flag) {
    state.signStatus = flag
  }
}

export default mutations
