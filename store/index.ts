import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  authenticated: false,

  error: null as string | null,

  user: {
    id: '',
    name: '',
    email: ''
  }
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_ERROR: (state, error: string) => { state.error = error },
  CLEAR_ERROR: (state) => { state.error = null },
  SIGN_IN: (state, user: typeof state.user) => {
    state.authenticated = true
    state.user = user
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SIGN_OUT: (stateOld) => { stateOld = state() }
}

export const actions: ActionTree<RootState, RootState> = {
  async signIn ({ commit, state }, { email, password }) {
    if (state.authenticated) { return }

    try {
      const response = await this.$axios.$post('/signin_api', { email, password })
      commit('SIGN_IN', response.user)
    } catch (error) {
      commit('SET_ERROR', error.data.alert)
    }
  }
}
