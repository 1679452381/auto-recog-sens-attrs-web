<template>
  <div>
    <el-card shadow=" never">
      <div class="table-select">
        <el-select v-model="select_table" placeholder="..." size="small">
          <el-option
            v-for="table in table_list"
            :key="table.id"
            :value="table"
          ></el-option>
        </el-select>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%; margin: 10px 0"
        highlight-current-row
        border
      >
        <el-table-column label="ID" width="50" type="index"> </el-table-column>
        <el-table-column prop="_attr" label="ATTRIBUTE" width="200">
        </el-table-column>
        <el-table-column prop="_col_type" label="TYPE" width="200">
        </el-table-column>
        <el-table-column prop="_sv_level" label="DEGREE" width="100">
        </el-table-column>
        <el-table-column prop="_is_sen" label="RULE" width="100">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page_info.pagenum"
        :page-sizes="[8, 16]"
        :page-size="page_info.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagetotal"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [
    "table_list",
    "tableData",
    "page_info",
    "select_table",
    "handleSizeChange",
    "handleCurrentChange",
    "pagetotal",
  ],
};
</script>

<style></style>
