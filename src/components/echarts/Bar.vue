<template>
  <div
    id="myChart"
    ref="Bar"
    :style="{ width: '300px', height: '300px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //   基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.Bar);
      //   绘制图表
      myChart.setOption({
        // title: {
        //   text: "Referer of a Website",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        // tooltip: {
        //   trigger: "item",
        // },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
#myChart {
  /* background-color: wheat; */
}
</style>
