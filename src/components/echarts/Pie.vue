<template>
  <div id="myPieChart" ref="Pie" :style="{ width: '500px', height: '400px' }">
    <p>{{ chart_info }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      my_chart_info: this.chart_info,
    };
  },
  props: {
    chart_info: {
      type: Array,
      default: () => {
        return [
          { value: 100, name: "High Sensitive Attr" },
          { value: 35, name: "Middle Sensitive Attr" },
          { value: 80, name: "Low Sensitive Attr" },
          { value: 44, name: "Not Sensitive Attr" },
        ];
      },
    },
  },
  watch: {
    chart_info: function () {
      this.drawLine();
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //   基于准备好的dom，初始化echarts实例
      // this.myChart = 1;
      // let linearPieDom = this.$echarts.getInstanceByDom(this.$refs.Pie);
      // console.log(linearPieDom);
      // console.log(JSON.stringify(this.chart_info));
      let myPieChart = this.$echarts.init(this.$refs.Pie);
      //   绘制图表
      myPieChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Sensitive Attr",
            type: "pie",
            radius: "55%",
            center: ["40%", "65%"],
            data: this.chart_info,
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

<style scoped></style>
