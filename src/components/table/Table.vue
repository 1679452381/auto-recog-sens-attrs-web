<template>
  <div>
    <el-table :data="db_info" stripe style="width: 100%">
      <el-table-column prop="db" label="database" width="100">
      </el-table-column>
      <el-table-column prop="tables" label="tables" width="100">
      </el-table-column>
      <el-table-column prop="columns" label="columns" width="100">
      </el-table-column>
      <el-table-column prop="rows" label="rows" width="100"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    props:["db_info"]
};
</script>

<style></style>
