<template>
    <div ref="chartRef" class="w-full h-full"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from "vue";
  import * as echarts from "echarts";
  
  const props = defineProps({ options: Object });
  const chartRef = ref(null);
  
  onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption(props.options);
    watch(() => props.options, (newOpts) => {
      chart.setOption(newOpts);
    });
  });
  </script>
  
  <style scoped>
  div {
    width: 100%;
    height: 100%;
  }
  </style>
  