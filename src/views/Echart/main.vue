<template >
    <ul class="list">
        <li>注册总人数:<span>1364</span></li>
        <li>近七天内注册人数:<span>432</span></li>
        <li>用户下单数:<span>863</span></li>
        <li>注销用户:<span>69</span></li>
    </ul>
    <div id="main" style="width: 60%; height: 80vh;margin: 0 auto;"></div>
</template>
<script setup>
import { nextTick, onMounted } from 'vue'
import * as echarts from 'echarts';

nextTick(() => {

    var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  title: {
    text: '网站用户分布图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '注册总人数' },
        { value: 335, name: '近七天内注册人数' },
        { value: 700, name: '用户下单数' },
        { value: 100, name: '注销用户' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option && myChart.setOption(option);
})
</script>
<style lang='less' scoped>
.list {
    display: flex;
    justify-content: space-evenly;
    font-size: 16px;
    width: 100%;
    margin-bottom: 20px;

    li {
        padding: 0 20px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 0 0 0.5px #000;

        span {
            margin: -10px 5px 0;
            font-weight: 700;
            font-size: 18px;
            height: 30px;
            line-height: 30px;
        }

        &:nth-child(1) span {
            color: skyblue
        }

        &:nth-child(2) span {
            color: rgb(88, 226, 53);
        }

        &:nth-child(3) span {
            color: rgb(223, 119, 50);
        }

        &:nth-child(4) span {
            color: rgb(255, 0, 0);
        }
    }
}
</style>