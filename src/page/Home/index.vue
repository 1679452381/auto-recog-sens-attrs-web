<template>
  <div>
    <div class="header">
      <el-form
        ref="dbRef"
        :model="linkData"
        :rules="dbRules"
        class="form"
        label-width="100px"
      >
        <el-form-item label="host:" prop="host">
          <el-input
            class="header-input"
            v-model="linkData.host"
            placeholder="请输入Host"
            size="small"
          ></el-input
        ></el-form-item>
        <el-form-item label="user:" prop="user">
          <el-input
            class="header-input"
            v-model="linkData.user"
            placeholder="请输入user"
            size="small"
          ></el-input
        ></el-form-item>
        <el-form-item label="password:" prop="password">
          <el-input
            class="header-input"
            type="password"
            v-model="linkData.password"
            placeholder="请输入密码"
            size="small"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="port:" prop="port">
          <el-input
            class="header-input"
            v-model="linkData.port"
            placeholder="请输入port"
            size="small"
          ></el-input
        ></el-form-item>
        <el-form-item label="database:" prop="db">
          <el-input
            class="header-input"
            v-model="linkData.db"
            placeholder="请输入database"
            size="small"
          ></el-input
        ></el-form-item>
      </el-form>
    </div>
    <hr />
    <div class="main">
      <div class="top">
        <span>系统配置文件</span>
        <span>
          <label for="">proportion：</label>
          <el-select v-model="proportion" placeholder="...">
            <el-option
              v-for="proportion in proportions"
              :key="proportion.id"
              :value="proportion"
            ></el-option> </el-select
        ></span>
        <span>
          <label for=""> level：</label>
          <el-select v-model="level" placeholder="...">
            <el-option
              v-for="level in sens_levels"
              :key="level.id"
              :value="level"
            ></el-option>
          </el-select>
        </span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <el-button size="medium" type="primary">Upload *.json</el-button>
        </el-upload>
        <div>
          <el-button type="primary" size="medium" @click="sumbit">
            submit
          </el-button>
        </div>
      </div>
      <div class="content">
        <div class="echars">
          <Table :db_info="db_info"></Table>
          <Pie :chart_info="chart_info"></Pie>
        </div>
        <div class="table">
          <el-card>
            <div class="table-select">
              <el-select v-model="select_table" placeholder="..." size="small">
                <el-option
                  v-for="table in table_list"
                  :key="table.id"
                  :value="table"
                ></el-option>
              </el-select>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column label="ID" width="50" type="index">
              </el-table-column>
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
              :total="page_info.pagetotal"
            >
            </el-pagination>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from "@/components/echarts/Pie.vue";
import Table from "@/components/table/Table.vue";
// import { mapMutations } from "vuex";
export default {
  components: {
    Pie,
    Table,
  },
  data() {
    return {
      linkData: {
        host: "09.0.0.0",
        user: "root",
        password: "zxczxc",
        port: 0,
        db: "demo",
      },
      db_info: [],
      proportion: "10%",
      level: 1,
      select_table: "",
      tableData: [],
      sens_levels: [1, 2, 3, 4, 5],
      proportions: [
        "10%",
        "20%",
        "30%",
        "40%",
        "50%",
        "60%",
        "70%",
        "80%",
        "90%",
        "100%",
      ],
      table_list: [],
      chart_info: [],
      page_info: {
        pagenum: 1,
        pagesize: 8,
        pagetotal: 0,
      },
      dbRules: {
        host: { required: true, message: "请输入host", trigger: "blur" },
        user: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        port: { required: true, message: "请输入端口号", trigger: "blur" },
        db: {
          required: true,
          message: "请输入database",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    sumbit() {
      this.$refs.dbRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const requestData = {
          linkData: this.linkData,
          proportion: this.proportion,
          level: this.level,
          senWords: [],
          senAttrs: [],
          tabName: this.select_table,
          page_info: this.page_info,
        };

        console.log(JSON.stringify(requestData));
        const { data } = await this.$http.post("/data", requestData);
        //获取数据库表列表
        if (data.code !== 200) {
          return this.$message.error("错了哦，这是一条错误消息");
        } else {
          this.$message.success(data.msg);
        }

        let data_info = data.data;
        this.table_list = data_info.table_list;
        this.select_table = this.table_list[0];
        this.tableData = data_info.columns;
        this.page_info.pagetotal = this.tableData.length;
        this.chart_info = data_info.chart_info;
        // console.log(JSON.stringify(this.chart_info));
        this.db_info = data_info.db_info;
      });
    },
    //每页多少条
    handleSizeChange(pageSize) {
      this.page_info.pagesize = pageSize;
      // console.log(JSON.stringify(this.page_info));
      this.sumbit();
    },
    //当前页
    handleCurrentChange(currentPage) {
      this.page_info.pagenum = currentPage;
      this.sumbit();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  height: 100px;
}
.form {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.header-input {
  /* width: 180px;
  margin: 0 20px; */
}
.input-group {
  display: flex;
  justify-content: space-around;
}
.main {
  margin: 10px 120px;
}
.top {
  margin-right: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content {
  display: flex;
  justify-content: space-between;
}
.echars {
  margin-top: 20px;
}
.table {
  width: 60%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.table-select {
  justify-self: flex-end;
}
</style>
