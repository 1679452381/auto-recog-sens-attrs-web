import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chart_info: []
  },
  mutations: {
    update(state,e){
      state.chart_info = e
    }
  },
  getters:{
    chart_info:state=>{
      return state.chart_info
    }
  },
  actions: {},
  modules: {},
});
