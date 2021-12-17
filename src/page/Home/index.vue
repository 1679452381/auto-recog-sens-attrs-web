<template>
  <div>
    <div class="header">
      <el-form
        ref="dbRef"
        :model="linkData"
        :rules="dbRules"
        class="forms"
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
    <el-divider></el-divider>
    <div class="main">
      <div class="top">
        <h3>系统配置文件</h3>
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
          :file-list="fileList"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="submitFile"
          :show-file-list="false"
          :on-progress="submiting"
        >
          <el-button size="medium" type="primary">Upload *.json</el-button>
        </el-upload>
        <div>
          <el-button
            type="primary"
            size="medium"
            @click="submit"
            icon="el-icon-setting"
          >
            配置
          </el-button>
        </div>
      </div>
      <div class="content">
        <el-tabs
          tab-position="left"
          style="height: 100%; weight: 100%; z-index: -1"
        >
          <el-tab-pane label="详细信息" class="row">
            <div class="echars">
              <DbTable :db_info="db_info"></DbTable>
              <Pie :chart_info="chart_info"></Pie>
            </div>
            <div class="table">
              <infoTable
                :tableData="tableData"
                :page_info="page_info"
                :pagetotal="pagetotal"
                :select_table="select_table"
                :handleSizeChange="handleSizeChange"
                :handleCurrentChange="handleCurrentChange"
              ></infoTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据脱敏"> </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from "@/components/echarts/Pie.vue";
import DbTable from "@/components/table/dbTable.vue";
import infoTable from "@/components/table/infoTable.vue";
import { sens_levels, proportions } from "@/util/constant";
// import debounce from '@/util/debounce'
// import { mapMutations } from "vuex";
export default {
  components: {
    Pie,
    DbTable,
    infoTable,
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
      proportion: "10%",
      level: 1,
      senWords: [],
      senAttrs: [],
      page_info: {
        pagenum: 1,
        pagesize: 8,
      },
      pagetotal: 0,
      select_table: "",
      db_info: [],
      tableData: [],
      sens_levels: sens_levels,
      proportions: proportions,
      table_list: [],
      chart_info: [],
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
      fileList: [],
    };
  },
  methods: {
    submit() {
      this.$refs.dbRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const requestData = {
          linkData: this.linkData,
          proportion: this.proportion,
          level: this.level,
          senWords: this.senWords,
          senAttrs: this.senAttrs,
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
        this.pagetotal = this.tableData.length;
        this.chart_info = data_info.chart_info;
        // console.log(JSON.stringify(this.chart_info));
        this.db_info = data_info.db_info;
      });
    },
    // debounce_submit(){
    //   debounce(this.submit,1000)
    // },
    //每页多少条
    handleSizeChange(pageSize) {
      this.page_info.pagesize = pageSize;
      // console.log(JSON.stringify(this.page_info));
      this.submit();
    },
    //当前页
    handleCurrentChange(currentPage) {
      this.page_info.pagenum = currentPage;
      this.submit();
    },
    //上传文件时
    submiting(event, file, fileList) {
      // console.log(event, file, fileList);
      console.log(event, file, fileList);
    },
    //处理文件
    submitFile(response, file, fileList) {
      console.log(file.name);
      let end = file.name.split(".")[1];
      if (end !== "json") {
        return this.$message.error("上传失败，请上传json文件");
      }
      this.$message.success("上传成功");
      console.log("1", response);
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        const fileString = e.target.result;
        const fileObj = JSON.parse(fileString);
        console.log(fileObj);
        this.senWords = fileObj.senWords;
        this.senAttrs = fileObj.senAttrs;
        console.log(this.senWords, this.senAttrs);
      };
      console.log(fileList);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-top: 20px;
  /* padding: auto 0; */
}
.forms {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
}
.input-group {
  display: flex;
  justify-content: space-around;
}
.main {
  margin: 10px 0px;
}
.top {
  /* margin-right: 200px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top label {
  font-size: 14px;
  color: #606266;
}
.content {
  margin: 30px 80px;
}
.row {
  display: flex;
  flex-direction: row;
}
.echars {
  /* display: flex;
  flex-direction: row-reverse; */
  width: 450px;
  margin-top: 20px;
}
.table {
  width: 800px;
  /* margin: 20px auto; */
  /* display: flex;
  flex-direction: column; */
}
.table-select {
  justify-self: flex-end;
}
</style>
