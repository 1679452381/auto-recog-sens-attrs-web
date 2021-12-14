<template>
  <div class="container">
    <Header :title="headTitle"></Header>
    <Home></Home>
  </div>
</template>

<script>

import Header from "../components/header/index.vue";
import Home from './Home/index.vue'
// import { mapMutations } from "vuex";
export default {
  components: {
    Header,
    Home
  },
  data() {
    return {
      headTitle:"敏感属性自动化识别与分析",
    }
  }

};
</script>

<style scoped>
</style>
