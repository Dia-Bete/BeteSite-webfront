import { MutationTree } from 'vuex'
import { RootState, User, UserBioData } from '~/types/store'

export const state = () => ({
  account: <User | null>null,
  bioData: <UserBioData | null>null
})

export const mutations: MutationTree<RootState> = {
  signIn: (state, user: User) => {
    state.account = user
  },
  signOut: (state) => {
    state.account = null
  },
  setBioData: (state, bioData: UserBioData) => {
    state.bioData = bioData
  }
}
