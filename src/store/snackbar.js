// ~/store/snackbar.js
const state = () => ({
  text: "",
  color: "",
  timeout: -1,
})

const mutations = {
  showMessage(state, payload) {
    state.text = payload.text;
    state.color = payload.color;
    state.timeout = payload.timeout || 2000;
  },
}

const actions = {
  showSnackAction(context, payload) {
    context.commit("showMessage", payload);
  },
  // showErrorAction(context, payload) {
  //   payload.color = "error";
  //   context.commit("showMessage", payload);
  // },
  // showSuccessAction(context, payload) {
  //   payload.color = "success";
  //   context.commit("showMessage", payload);
  // },
  // showStatusAction(context, payload) {
  //   payload.color = "primary";
  //   context.commit("showMessage", payload);
  // },


}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}