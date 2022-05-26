const getDefaultState = () => {
  return {
    querySearchString: '',
    name: '',
    info: null
  }
}

export const state = () => ({ ...getDefaultState() })

export const mutations = {
  SET_QUERY_SEARCH(state, payload) {
    state.querySearchString = payload
  },
  SET_NAME_FILM(state, payload) {
    state.name = payload
  },
  SET_INFO_REQUEST(state, payload) {
    state.info = payload
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  }
}

export const actions = {}
