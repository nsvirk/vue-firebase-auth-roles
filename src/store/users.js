// https://levelup.gitconnected.com/firebase-auth-management-in-vue-js-with-vuex-9c4a5d9cedc

import { auth, database } from "@/plugins/firebase/init.js";
import router from "@/router/index.js"

// Database ref paths
let refRoot = process.env.NODE_ENV;
let refUsers = process.env.NODE_ENV + '/users';

/**
 * Handles State of User Authentication
 */

/**
 * STATE 
 */
const state = () => ({
  user: null,
  roles: []
})

/**
 * GETTERS 
 */
const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  isUserAdmin(state) {
    let adminVal = state.roles.toString().indexOf("admin");
    if (adminVal == -1) { return false } else { return true }
  },
  isUserPaid(state) {
    let paidVal = state.roles.toString().indexOf("paid");
    if (paidVal == -1) { return false } else { return true }
  },
  getRoles(state) {
    return state.roles;
  },
  getError(state) {
    return state.error;
  },
  getStatus(state) {
    return state.status;
  },
};

/**
 * MUTATIONS 
 */
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setRoles: (state, payload) => {
    state.roles = payload.roles;
  },

};
/**
 * ACTIONS
 */
const actions = {

  authAction({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
        //After Signin
        router.push('/authpage');
        //Set Roles from Database on user signin
        //As it is not in auth info but a seperate database
        database
          .ref(refUsers)
          .child(user.uid)
          .get()
          .then((snap) => {
            if (snap.exists()) {
              let roles = snap.val().roles;
              commit('setRoles', { roles })
            } else {
              let roles = [];
              commit('setRoles', { roles })
            }
          })
          .catch((error) => {
            commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
          });

      } else {
        //After Signout
        if (router.currentRoute.path != '/') {
          router.push('/');
        }

        commit("setUser", null);
      }
    });
  },

  signUpAction({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let status = `${response.user.email} signed up and also signed in`;
        commit("snackbar/showMessage", { text: status, color: "success" }, { root: true });
      })
      .catch(error => {
        commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
      });
  },

  signInAction({ commit }, payload) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let status = `${response.user.email} signed in`;
        commit("snackbar/showMessage", { text: status, color: "success" }, { root: true });
      })
      .catch(error => {
        commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
      });
  },

  signOutAction({ commit }) {
    auth
      .signOut()
      .then(() => {
        let status = "User signed out";
        commit("setUser", null);
        commit("snackbar/showMessage", { text: status, color: "error" }, { root: true });
      })
      .catch(error => {
        commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
      });
  },

  updateProfileAction({ commit }, { displayName }) {
    auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: ""
    }).then(() => {
      let status = "User profile updated";
      commit("snackbar/showMessage", { text: status, color: "success" }, { root: true });
    }).catch(error => {
      commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
    });
  },

  updateRolesAction: ({ commit }, payload) => {
    let childKey = payload.user.uid;
    let saveInfo = {};
    saveInfo.email = payload.user.email;
    saveInfo.roles = payload.roles;
    database
      .ref(refUsers)
      .child(childKey)
      .set(saveInfo, (error) => {
        if (error) {
          commit("snackbar/showMessage", { text: error.message, color: "error" }, { root: true });
        } else {
          let status = "User roles updated";
          commit("snackbar/showMessage", { text: status, color: "success" }, { root: true });
          commit('setRoles', payload)
        }
      })
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}