<template>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.title {
  color: white;
  width: 100%;
  height: 80px;
  background-color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
