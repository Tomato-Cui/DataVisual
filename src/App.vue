<script setup>
// 路由相关的组件都从视图中加载
</script>

<template>
  <div class="min-h-screen bg-gray-50 w-full overflow-x-hidden">
    <header class="bg-white shadow w-full">
      <div class="w-full px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">大屏可视化项目</h1>
          <nav class="flex space-x-6">
            <router-link to="/" class="px-4 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" :class="{ 'bg-blue-50 text-blue-600 font-semibold': $route.path === '/' }">首页</router-link>
            <router-link to="/dashboard" class="px-4 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" :class="{ 'bg-blue-50 text-blue-600 font-semibold': $route.path === '/dashboard' }">仪表盘</router-link>
            <router-link to="/datavisual" class="px-4 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" :class="{ 'bg-blue-50 text-blue-600 font-semibold': $route.path === '/datavisual' }">数据大屏</router-link>
          </nav>
        </div>
      </div>
    </header>
    <main class="py-6 w-full">
      <!-- 路由视图 -->
      <router-view />
    </main>
  </div>
</template>
