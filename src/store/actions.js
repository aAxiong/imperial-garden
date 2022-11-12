import * as types from './mutation-types'

export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_PLAYING_STATE, true)

}
export const selectPlayRadio = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_PLAYINGRADIO_STATE, true)

}

export const selectMute = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_MUTE_STATE, true)

}
