<template>
  <div class="w-full px-4">
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">仪表盘</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 卡片 1 -->
        <div class="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-3">数据概览</h2>
          <p class="text-4xl font-bold">8,546</p>
          <p class="text-sm opacity-80 mt-2">今日访问量</p>
        </div>
        
        <!-- 卡片 2 -->
        <div class="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-3">转化率</h2>
          <p class="text-4xl font-bold">24.8%</p>
          <p class="text-sm opacity-80 mt-2">同比增长 3.2%</p>
        </div>
        
        <!-- 卡片 3 -->
        <div class="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-3">活跃用户</h2>
          <p class="text-4xl font-bold">1,265</p>
          <p class="text-sm opacity-80 mt-2">较昨日 +15%</p>
        </div>
      </div>
      
      <!-- 图表区域 -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold mb-4">数据趋势</h2>
        <div class="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <!-- 这里可以放置您的图表组件 -->
          <p class="text-gray-500">图表区域 - 可以使用 BaseChart 组件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 这里可以添加页面所需的逻辑
const pageTitle = ref('仪表盘页面');
</script> 