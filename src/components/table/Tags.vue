<template>
  <div>
    <el-tag v-if="degree === 0">{{ degree }}</el-tag>
    <el-tag type="success" v-if="degree === 1">{{ degree }}</el-tag>
    <el-tag type="warning" v-else-if="degree === 2">{{ degree }}</el-tag>
    <el-tag type="danger" v-else-if="degree === 3">{{ degree }}</el-tag>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.degree);
  },
  props: ["degree"],
};
</script>

<style></style>
