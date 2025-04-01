<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/src/assets/images/background.png')">
    </div>
    <!-- 内容区域 -->
    <div class="relative z-10 w-full h-full flex flex-col">
      <!-- 顶部标题背景 -->
      <div class="w-full h-[72px] relative">
        <img src="@/assets/images/head.png" alt="header" class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center justify-between px-8">
          <!-- 左侧装饰 -->
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-[#00FFFF]"></div>
            <div class="w-1 h-1 rounded-full bg-[#00FFFF]"></div>
            <div class="w-1 h-1 rounded-full bg-[#00FFFF]"></div>
          </div>
          <!-- 中间标题 -->
          <h1
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white tracking-[0.5em]">
            试验检测管理驾驶舱</h1>
          <!-- 右侧装饰和时间 -->
          <div class="flex items-center gap-4">
            <div class="text-white">{{ currentTime }}</div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-[#00FFFF]"></div>
              <div class="w-1 h-1 rounded-full bg-[#00FFFF]"></div>
              <div class="w-1 h-1 rounded-full bg-[#00FFFF]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex-1 grid grid-cols-12 gap-2 p-4 min-w-[1200px] min-h-[600px]">
        <!-- 左侧区域 -->
        <div class="col-span-3 space-y-1 sm:space-y-2 md:space-y-2 xl:space-y-1 relative -top-4">
          <!-- 合同签订 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center ">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">合同签订</h2>
            </div>
            <div class="flex justify-between ">
              <div class="text-gray-400 text-xs sm:text-sm mb-1">已签数量&nbsp;&nbsp;{{ dashboardData.contract.signed }}个
              </div>
              <div class="text-gray-400 text-xs sm:text-sm mb-1">未签数量&nbsp;&nbsp;{{ dashboardData.contract.unsigned }}个
              </div>
            </div>
            <div class="flex justify-between mt-1 text-xs sm:text-sm text-gray-400">
              <div>已签 {{ dashboardData.contract.percentage }}%</div>
              <div>未签 {{ 100 - dashboardData.contract.percentage }}%</div>
            </div>
            <div class="relative h-1.5 sm:h-2 bg-[#1d2b53] rounded-full overflow-hidden">
              <div class="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400"
                :style="{ width: dashboardData.contract.percentage + '%' }">
              </div>
            </div>

          </div>

          <!-- 合同数量趋势 -->
          <div
            class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(23vh-2rem)] h-20">
            <div class="flex items-center ">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">合同数量趋势</h2>
            </div>
            <div ref="contractTrendChart" class="w-full h-[calc(100%-2rem)] "></div>
          </div>

          <!-- 合作区域分布 -->
          <div
            class="bg-[#1d2b53]/40  p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(24vh-2rem)] h-25">
            <div class="flex items-center ">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">合作区域分布</h2>
            </div>
            <div ref="regionChart" class="w-full h-[calc(100%-2rem)]  "></div>
          </div>

          <!-- 合同数量排名 Top5 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">合同数量排名 Top3</h2>
            </div>
            <div class="w-full">
              <!-- 表头 -->
              <div
                class="flex justify-between text-xs text-blue-300 mb-1 px-2 py-1 bg-gradient-to-r from-[#192e69]/50 to-transparent">
                <div class="w-28 sm:w-36">单位名称</div>
                <div>项目数量</div>
              </div>
              <!-- 列表项 -->
              <div v-for="(item, index) in contractRankingList" :key="index"
                class="flex justify-between text-xs text-white py-1 px-2 border-b border-[#1d2b53]/60 hover:bg-[#192e69]/30 transition-colors">
                <div class="truncate flex-1 mr-2 text-blue-100">{{ item.name }}</div>
                <div class="text-yellow-400 font-medium">{{ item.count }}</div>
              </div>
            </div>
          </div>


          <!-- 项目类型区域 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center ">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">项目类型</h2>
            </div>
            <div class="flex h-[105px]">
              <!-- 饼图区域 -->
              <div ref="projectTypeChart" class="w-[50%] h-full "></div>

              <!-- 百分比列表 -->
              <div class="w-[50%] pl-2 h-full">
                <div class="flex items-center mb-1.5 text-xs">
                  <div class="w-[10px] h-[10px] rounded-full mr-2 bg-blue-400"></div>
                  <div class="w-[90px] text-blue-300">桥梁隧道</div>
                  <div class="text-blue-300 ml-auto">50%</div>
                </div>
                <div class="flex items-center mb-1.5 text-xs">
                  <div class="w-[10px] h-[10px] rounded-full mr-2 bg-blue-500"></div>
                  <div class="w-[90px] text-blue-300">道路材料</div>
                  <div class="text-blue-300 ml-auto">20%</div>
                </div>
                <div class="flex items-center mb-1.5 text-xs">
                  <div class="w-[10px] h-[10px] rounded-full mr-2 bg-blue-600"></div>
                  <div class="w-[90px] text-blue-300">道路材料</div>
                  <div class="text-blue-300 ml-auto">15%</div>
                </div>
                <div class="flex items-center mb-1.5 text-xs">
                  <div class="w-[10px] h-[10px] rounded-full mr-2 bg-blue-700"></div>
                  <div class="w-[90px] text-blue-300">道路材料</div>
                  <div class="text-blue-300 ml-auto">10%</div>
                </div>
                <div class="flex items-center mb-1.5 text-xs">
                  <div class="w-[10px] h-[10px] rounded-full mr-2 bg-yellow-400"></div>
                  <div class="w-[90px] text-blue-300">道路材料</div>
                  <div class="text-blue-300 ml-auto">5%</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 中间区域 -->
        <div class="col-span-6 flex flex-col space-y-2 sm:space-y-3 md:space-y-4 xl:space-y-6 relative -top-4">
          <!-- 地图区域 -->
          <div class="flex-1 bg-[#1d2b53]/40 rounded-lg border border-[#1d2b53] relative overflow-hidden">
            <!-- Canvas 特效层 -->
            <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full z-20"></canvas>

            <!-- 背景光效 -->
            <div class="absolute inset-0 bg-grid z-10"></div>
            <div class="absolute inset-0 bg-dots z-10"></div>

            <!-- 地图容器 -->
            <div ref="chinaMapChart" class="w-full h-full relative z-30"></div>

            <!-- 扫描线效果 -->
            <div class="absolute inset-0 scan-line z-15"></div>

            <!-- 地图底座 -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-25">
              <!-- 光环组 -->
              <div class="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[140%] aspect-[4/1]">
                <div class="absolute inset-0 tech-circle"></div>
                <div class="absolute inset-[10%] tech-circle" style="animation-delay: -2s"></div>
                <div class="absolute inset-[20%] tech-circle" style="animation-delay: -4s"></div>
              </div>
            </div>

            <!-- 四角装饰 -->
            <div class="absolute top-0 left-0 w-20 h-20 corner-decoration"></div>
            <div class="absolute top-0 right-0 w-20 h-20 corner-decoration rotate-90"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 corner-decoration -rotate-90"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 corner-decoration rotate-180"></div>
          </div>
          <!-- 数据统计卡片 -->
          <div class="grid grid-cols-6 gap-4  mt-auto">
            <div v-for="(item, index) in statisticsData" :key="index" class="relative group">
              <!-- 标题 -->
              <div
                class="text-[16px] font-[500] text-[#26DEFF] leading-none font-['PingFang_SC'] text-center border border-[#1d2b53] rounded-lg p-2 mb-2 bg-[#1d2b53]/40">
                {{ item.title }}</div>
              <!-- 卡片背景 -->
              <div class="bg-[#1d2b53]/40 p-2 rounded-lg border border-[#1d2b53] flex flex-col items-center  m-h-30">
                <!-- 图标 -->
                <div class="w-12 h-12 mb-2 relative ">
                  <img :src="item.icon" alt="icon"
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  <!-- 发光效果 -->
                  <div
                    class="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </div>
                <!-- 数值 -->
                <div class="text-2xl font-bold text-[#4db3ff]  ">{{ item.value }}</div>

              </div>
              <!-- 底部发光线 -->
              <div
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-[#4db3ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm">
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="col-span-3 space-y-1 sm:space-y-2 md:space-y-2 xl:space-y-1 relative -top-4">
          <!-- 报告勘误 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(24vh-2rem)]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">报告勘误</h2>
            </div>
            <div class="flex items-center justify-between px-4">
              <!-- 左侧图表区域 -->
              <div class="relative w-[45%]">
                <div ref="reportCorrectionChart" class="w-32 h-32"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div class="text-2xl font-bold text-[#4db3ff]">50%</div>
                </div>
              </div>
              <!-- 右侧图例区域 -->
              <div class="flex flex-col gap-3 w-[45%]">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#4db3ff]"></div>
                  <div class="text-xs text-gray-400">待勘误</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">50</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#1d2b53]"></div>
                  <div class="text-xs text-gray-400">已勘误</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">50</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 报告进展 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(22vh-2rem)]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">报告进展</h2>
            </div>
            <div ref="reportProgressChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>

          <!-- 设备情况 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(20vh-2rem)]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">设备情况</h2>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-[#2a3a6a] p-1.5 rounded-lg">
                <div class="text-xs text-gray-400 mb-0.5">设备总数</div>
                <div class="text-xl font-bold text-cyan-400">{{ dashboardData.deviceStatus.total }}</div>
                <div class="text-xs text-green-400">本月新增设备 <span class="ml-1">↑{{ dashboardData.deviceStatus.monthlyNewDevices }}台</span></div>
              </div>
              <div class="bg-[#2a3a6a] p-1.5 rounded-lg">
                <div class="text-xs text-gray-400 mb-0.5">设备种类</div>
                <div class="text-xl font-bold text-cyan-400">{{ dashboardData.deviceStatus.types }}</div>
                <div class="text-xs text-green-400">本月新增种类 <span class="ml-1">↑{{ dashboardData.deviceStatus.monthlyNewTypes }}种</span></div>
              </div>
            </div>
          </div>

          <!-- 设备状态分布 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(20vh-2rem)]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon">设备状态分布</h2>
            </div>
            <div class="flex items-center justify-between px-4">
              <!-- 左侧图表区域 -->
              <div class="relative w-[60%]">
                <div ref="deviceStatusChart" class="w-full h-[80px]"></div>
              </div>
              <!-- 右侧图例区域 -->
              <div class="flex flex-col gap-0.5 w-[35%]">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#00ff00]"></div>
                  <div class="text-xs text-gray-400">使用中</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">22</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#00ffff]"></div>
                  <div class="text-xs text-gray-400">报废</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">22</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#4d7eff]"></div>
                  <div class="text-xs text-gray-400">空闲</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">22</div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#ffd700]"></div>
                  <div class="text-xs text-gray-400">停用</div>
                  <div class="text-xs text-[#4db3ff] ml-auto">22</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 通期预警 -->
          <div class="bg-[#1d2b53]/40 p-1 sm:p-1 md:p-1 xl:p-1 rounded-lg border border-[#1d2b53] h-[calc(20vh-1rem)]">
            <div class="flex items-center">
              <h2 class="text-sm sm:text-sm md:text-sm font-medium text-white title-with-icon mb-2">通期预警</h2>
            </div>
            <div class="flex h-[calc(100%-2rem)] items-center">
              <!-- 左侧图标 - 使用用户提供的defense.png图片 -->
              <div class="w-1/3 flex items-center justify-center">
                <img src="../assets/images/defense.png" alt="通期预警图标" class="w-24 h-24 object-contain" />
              </div>
              
              <!-- 右侧文字内容 -->
              <div class="w-2/3 flex flex-col justify-center space-y-2 px-2">
                <div class="text-sm text-white">设备报修：<span class="text-[#4db3ff]">X光待处理报修</span></div>
                <div class="text-sm text-white">试剂预警：<span class="text-[#4db3ff]">试剂X库存不足</span></div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import backgroundImage from '@/assets/images/background.png';
import axios from 'axios';
import icon1 from '../assets/images/icon1.png';
import icon2 from '../assets/images/icon2.png';
import icon3 from '../assets/images/icon3.png';
import icon4 from '../assets/images/icon4.png';
import icon5 from '../assets/images/icon5.png';
import icon6 from '../assets/images/icon6.png';
import base from '../assets/images/base.png';
import texticon from '../assets/images/texticon.png';

// 图表实例
const contractTrendChart = ref(null);
const regionChart = ref(null);
const chinaMapChart = ref(null);
const reportCorrectionChart = ref(null);
const reportProgressChart = ref(null);
const deviceStatusChart = ref(null);
const projectTypeChart = ref(null);

// 数据
const currentTime = ref('');
const statisticsData = ref([
  { title: '合同数', value: '5888', icon: icon1 },
  { title: '委托量', value: '5888', icon: icon2 },
  { title: '报告审批量', value: '5666', icon: icon3 },
  { title: '任务完成量', value: '5800', icon: icon4 },
  { title: '检测数据', value: '128', icon: icon5 },
  { title: '设备数', value: '358', icon: icon6 }
]);

// 背景图片URL
const backgroundImageUrl = ref('@background.png');

// Canvas 相关变量
const particleCanvas = ref(null);
let ctx = null;
let width = 0;
let height = 0;
let particles = [];
const particleCount = 150;
const particleSpeed = 0.8;
const particleSize = 1.2;
const maxDistance = 100;
const lightningColor = "#4db3ff";
let animationFrameId = null;

// 粒子类
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.color = lightningColor;
    this.angle = Math.random() * 360;
    this.speed = Math.random() * particleSpeed;
    this.opacity = Math.random() * 0.3 + 0.2;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(77, 179, 255, ${this.opacity})`;
    ctx.fill();
  }
}

// 创建粒子
function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// 绘制连接线
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(77, 179, 255, ${0.2 * (1 - distance / maxDistance)})`;
        ctx.lineWidth = 0.3 * (1 - distance / maxDistance);
        ctx.stroke();
      }
    }
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, width, height);

  // 设置全局透明度
  ctx.globalAlpha = 0.8;

  for (const particle of particles) {
    particle.update();
    particle.draw();
  }

  drawConnections();

  // 存储动画帧ID以便清理
  animationFrameId = requestAnimationFrame(animate);
}

// 鼠标交互
function handleMouseMove(e) {
  const rect = particleCanvas.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (const particle of particles) {
    const dx = mouseX - particle.x;
    const dy = mouseY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < maxDistance * 1.5) {
      particle.angle = Math.atan2(dy, dx);
      particle.speed = 2;
      particle.opacity = 0.5;
    } else {
      particle.speed = Math.random() * particleSpeed;
      particle.opacity = Math.random() * 0.3 + 0.2;
    }
  }
}

// 初始化 Canvas
function initCanvas() {
  if (!particleCanvas.value) return;

  ctx = particleCanvas.value.getContext('2d');

  // 获取实际显示大小
  const rect = particleCanvas.value.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

  // 设置 Canvas 分辨率
  particleCanvas.value.width = width * window.devicePixelRatio;
  particleCanvas.value.height = height * window.devicePixelRatio;

  // 缩放上下文以匹配设备像素比
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  createParticles();
  animate();

  particleCanvas.value.addEventListener('mousemove', handleMouseMove);
}

// 清理函数
function cleanup() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (particleCanvas.value) {
    particleCanvas.value.removeEventListener('mousemove', handleMouseMove);
  }
}

// 监听窗口大小变化
function handleResize() {
  if (!particleCanvas.value) return;

  const rect = particleCanvas.value.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

  particleCanvas.value.width = width * window.devicePixelRatio;
  particleCanvas.value.height = height * window.devicePixelRatio;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  createParticles();
}

// 创建注册中国地图
const registerMap = async () => {
  try {
    // 从本地加载地图数据
    const response = await fetch('/json/100000_full.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const chinaJson = await response.json();
    // 注册地图
    echarts.registerMap('china', chinaJson);
    return true;
  } catch (error) {
    console.error('加载中国地图失败:', error);
    return false;
  }
};

// 更新时间
let timeInterval;
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 数据状态管理
const dashboardData = ref({
  contract: {
    signed: 5800,
    unsigned: 88,
    total: 5888,
    percentage: 60
  },
  contractTrend: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    counts: [30, 35, 32, 29, 30, 26],
    rates: [30, 35.5, 33, 29.1, 29.1, 27.6]
  },
  regionDistribution: [
    { value: 22, name: '四川省' },
    { value: 22, name: '贵州省' },
    { value: 22, name: '重庆市' },
    { value: 22, name: '云南省' }
  ],
  statistics: {
    contractCount: 5888,
    delegationCount: 5888,
    reportApprovalCount: 5666,
    taskCompletionCount: 5800,
    testDataCount: 128,
    deviceCount: 358
  },
  reportCorrection: {
    pending: 50,
    completed: 50,
    percentage: 50
  },
  reportProgress: {
    stages: ['已复核', '已审核', '已提交', '待编制'],
    counts: [1200, 600, 400, 300]
  },
  deviceStatus: {
    total: 9999,
    types: 9999,
    monthlyNewDevices: 50,
    monthlyNewTypes: 50
  },
  projectTypes: [
    { name: '桥梁隧道', value: 50, color: '#4db3ff' },
    { name: '道路材料', value: 20, color: '#00a1ff' },
    { name: '道路材料', value: 15, color: '#00d1ff' },
    { name: '道路材料', value: 10, color: '#00a1ff' },
    { name: '道路材料', value: 5, color: '#ffc107' }
  ]
});

// 合同数量排名列表数据
const contractRankingList = ref([
  { name: '单位名称单位名称名称单位名称单位名称名称单位', count: 100 },
  { name: '单位名称单位名称名称单位名称单位名称名称单位', count: 100 },
  { name: '单位名称单位名称名称单位名称单位名称名称单位', count: 100 }
]);

// API服务
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const fetchDashboardData = async () => {
  try {
    // 实际环境中应该调用后端API
    // const response = await axios.get(`${API_BASE_URL}/dashboard`);
    // return response.data;
    
    // 模拟后端返回的数据
    return {
      contract: {
        signed: Math.floor(Math.random() * 1000) + 5000,
        unsigned: Math.floor(Math.random() * 100) + 50,
        get total() { return this.signed + this.unsigned },
        get percentage() { return Math.round((this.signed / this.total) * 100) }
      },
      contractTrend: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月'],
        counts: Array.from({length: 6}, () => Math.floor(Math.random() * 10) + 25),
        get rates() { return this.counts.map(count => +(count + Math.random() * 2).toFixed(1)) }
      },
      regionDistribution: [
        { value: Math.floor(Math.random() * 10) + 20, name: '四川省' },
        { value: Math.floor(Math.random() * 10) + 20, name: '贵州省' },
        { value: Math.floor(Math.random() * 10) + 20, name: '重庆市' },
        { value: Math.floor(Math.random() * 10) + 20, name: '云南省' }
      ],
      statistics: {
        contractCount: Math.floor(Math.random() * 1000) + 5000,
        delegationCount: Math.floor(Math.random() * 1000) + 5000,
        reportApprovalCount: Math.floor(Math.random() * 1000) + 5000,
        taskCompletionCount: Math.floor(Math.random() * 1000) + 5000,
        testDataCount: Math.floor(Math.random() * 100) + 100,
        deviceCount: Math.floor(Math.random() * 100) + 300
      },
      reportCorrection: {
        pending: Math.floor(Math.random() * 30) + 30,
        completed: Math.floor(Math.random() * 30) + 30,
        get percentage() { return Math.round((this.pending / (this.pending + this.completed)) * 100) }
      },
      reportProgress: {
        stages: ['已复核', '已审核', '已提交', '待编制'],
        counts: Array.from({length: 4}, () => Math.floor(Math.random() * 500) + 300)
      },
      deviceStatus: {
        total: 9999,
        types: 9999,
        monthlyNewDevices: Math.floor(Math.random() * 30) + 30,
        monthlyNewTypes: Math.floor(Math.random() * 30) + 30,
        distribution: [
          { value: Math.floor(Math.random() * 10) + 20, name: '使用中' },
          { value: Math.floor(Math.random() * 10) + 20, name: '报废' },
          { value: Math.floor(Math.random() * 10) + 20, name: '空闲' },
          { value: Math.floor(Math.random() * 10) + 20, name: '停用' }
        ]
      },
      projectTypes: [
        { name: '桥梁隧道', value: 50 },
        { name: '道路材料', value: 20 },
        { name: '道路材料', value: 15 },
        { name: '道路材料', value: 10 },
        { name: '道路材料', value: 5 }
      ],
      contractRanking: Array.from({length: 3}, () => ({
        name: '单位名称' + Math.random().toString(36).substring(7),
        count: Math.floor(Math.random() * 50) + 50
      }))
    };
  } catch (error) {
    console.error('获取数据失败:', error);
    return null;
  }
};

// 更新图表数据
const updateCharts = (data) => {
  if (!data) return;

  // 更新合同数量趋势图
  const contractTrend = echarts.getInstanceByDom(contractTrendChart.value);
  if (contractTrend) {
    contractTrend.setOption({
      xAxis: { data: data.contractTrend.months },
      series: [
        { data: data.contractTrend.counts },
        { data: data.contractTrend.rates }
      ]
    });
  }

  // 更新区域分布图
  const region = echarts.getInstanceByDom(regionChart.value);
  if (region) {
    region.setOption({
      series: [{ data: data.regionDistribution }]
    });
  }

  // 更新报告勘误图
  const reportCorrection = echarts.getInstanceByDom(reportCorrectionChart.value);
  if (reportCorrection) {
    reportCorrection.setOption({
      series: [{
        data: [
          {
            value: data.reportCorrection.pending,
            name: '待勘误',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4db3ff' },
                { offset: 1, color: '#2a83ff' }
              ])
            }
          },
          {
            value: data.reportCorrection.completed,
            name: '已勘误',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1d2b53' },
                { offset: 1, color: '#141e3c' }
              ])
            }
          }
        ]
      }]
    });
  }

  // 更新报告进展图
  const reportProgress = echarts.getInstanceByDom(reportProgressChart.value);
  if (reportProgress) {
    reportProgress.setOption({
      yAxis: { data: data.reportProgress.stages },
      series: [{ data: data.reportProgress.counts }]
    });
  }

  // 更新设备状态分布图
  const deviceStatus = echarts.getInstanceByDom(deviceStatusChart.value);
  if (deviceStatus) {
    deviceStatus.setOption({
      series: [{ data: data.deviceStatus.distribution }]
    });
  }

  // 更新项目类型图
  const projectType = echarts.getInstanceByDom(projectTypeChart.value);
  if (projectType) {
    projectType.setOption({
      series: [{ data: data.projectTypes }]
    });
  }

  // 更新统计数据
  statisticsData.value = [
    { title: '合同数', value: data.statistics.contractCount.toString(), icon: icon1 },
    { title: '委托量', value: data.statistics.delegationCount.toString(), icon: icon2 },
    { title: '报告审批量', value: data.statistics.reportApprovalCount.toString(), icon: icon3 },
    { title: '任务完成量', value: data.statistics.taskCompletionCount.toString(), icon: icon4 },
    { title: '检测数据', value: data.statistics.testDataCount.toString(), icon: icon5 },
    { title: '设备数', value: data.statistics.deviceCount.toString(), icon: icon6 }
  ];

  // 更新合同排名列表
  contractRankingList.value = data.contractRanking;

  // 更新仪表板数据
  dashboardData.value = data;
};

// 定时刷新数据
let dataRefreshInterval;
const refreshData = async () => {
  const data = await fetchDashboardData();
  if (data) {
    updateCharts(data);
  }
};

// 初始化图表
const initCharts = async () => {
  // 注册中国地图
  const mapRegistered = await registerMap();

  // 合同数量趋势图
  const contractTrend = echarts.init(contractTrendChart.value);
  contractTrend.setOption({
    grid: {
      top: '10%',
      left: '3%',
      right: '3%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: {
        lineStyle: {
          color: '#5d6f97'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#192e69'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '合作数',
        type: 'bar',
        barWidth: '30%',
        data: [30, 35, 32, 29, 30, 26],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4db3ff' },
            { offset: 1, color: '#2a83ff' }
          ])
        }
      },
      {
        name: '增速',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: [30, 35.5, 33, 29.1, 29.1, 27.6],
        itemStyle: {
          color: '#ffa94d'
        },
        lineStyle: {
          color: '#ffa94d',
          width: 2
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#4db3ff',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: ['合作数', '增速'],
      right: 0,
      textStyle: {
        color: '#fff'
      }
    }
  });

  // 区域分布图
  const region = echarts.init(regionChart.value);
  region.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#4db3ff',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: [
          { value: 22, name: '四川省' },
          { value: 22, name: '贵州省' },
          { value: 22, name: '重庆市' },
          { value: 22, name: '云南省' }
        ],
        label: {
          color: '#fff'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  // 中国地图
  if (mapRegistered) {
    const chinaMap = echarts.init(chinaMapChart.value);
    chinaMap.setOption({
      geo: {
        map: 'china',
        roam: false,
        center: [104, 36],
        zoom: 1.2,
        label: {
          show: false
        },
        itemStyle: {
          areaColor: '#142957',
          borderColor: '#2ab8ff',
          borderWidth: 1.5,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        emphasis: {
          itemStyle: {
            areaColor: '#1a3872'
          },
          label: {
            show: false
          }
        }
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            { name: '重庆', value: [107.7539, 30.1904, 10] },
            { name: '西安', value: [108.9402, 34.3416, 10] }
          ],
          symbolSize: 15,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            scale: 5
          },
          hoverAnimation: true,
          itemStyle: {
            color: '#ffcc33',
            shadowBlur: 10,
            shadowColor: '#ffcc33'
          },
          zlevel: 1
        }
      ]
    });
  } else {
    // 中国地图加载失败，显示提示信息
    const chinaMap = echarts.init(chinaMapChart.value);
    chinaMap.setOption({
      title: {
        text: '地图数据加载失败',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        left: 'center',
        top: 'center'
      }
    });
  }

  // 报告勘误图
  const reportCorrection = echarts.init(reportCorrectionChart.value);
  reportCorrection.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#4db3ff',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        startAngle: 90,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          scale: true
        },
        data: [
          {
            value: 50,
            name: '待勘误',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4db3ff' },
                { offset: 1, color: '#2a83ff' }
              ])
            }
          },
          {
            value: 50,
            name: '已勘误',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1d2b53' },
                { offset: 1, color: '#141e3c' }
              ])
            }
          }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  });

  // 报告进展图
  const reportProgress = echarts.init(reportProgressChart.value);
  reportProgress.setOption({
    grid: {
      top: '10%',
      left: '3%',
      right: '15%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: ['已复核', '已审核', '已提交', '待编制'],
      axisLine: {
        lineStyle: {
          color: '#5d6f97'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'bar',
        data: [1200, 600, 400, 300],
        barWidth: '30%',
        itemStyle: {
          color: function (params) {
            const colors = [
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#5470c6' },
                { offset: 1, color: '#3a56a8' }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#91cc75' },
                { offset: 1, color: '#5a9f4b' }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#fac858' },
                { offset: 1, color: '#d4a43c' }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ee6666' },
                { offset: 1, color: '#c54b4b' }
              ])
            ];
            return colors[params.dataIndex];
          },
          borderRadius: [0, 15, 15, 0]
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff'
        }
      }
    ]
  });

  // 设备状态分布图
  const deviceStatus = echarts.init(deviceStatusChart.value);
  deviceStatus.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#4db3ff',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '85%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          scale: true
        },
        data: [
          {
            value: 22,
            name: '使用中',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00ff00' },
                { offset: 1, color: '#00cc00' }
              ])
            }
          },
          {
            value: 22,
            name: '报废',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00ffff' },
                { offset: 1, color: '#00cccc' }
              ])
            }
          },
          {
            value: 22,
            name: '空闲',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4d7eff' },
                { offset: 1, color: '#3a65cc' }
              ])
            }
          },
          {
            value: 22,
            name: '停用',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ffd700' },
                { offset: 1, color: '#ccac00' }
              ])
            }
          }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  });

  // 项目类型分布图
  const projectType = echarts.init(projectTypeChart.value);
  projectType.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderColor: '#4db3ff',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      show: false
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      data: [
        { value: 50, name: '桥梁隧道', itemStyle: { color: '#4db3ff' } },
        { value: 20, name: '道路材料', itemStyle: { color: '#3285ff' } },
        { value: 15, name: '道路材料', itemStyle: { color: '#1e5eff' } },
        { value: 10, name: '道路材料', itemStyle: { color: '#0938ff' } },
        { value: 5, name: '道路材料', itemStyle: { color: '#ffc107' } }
      ],
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  });

  // 监听窗口大小变化，调整图表大小
  window.addEventListener('resize', () => {
    contractTrend.resize();
    region.resize();
    if (mapRegistered) {
      chinaMap.resize();
    }
    reportCorrection.resize();
    reportProgress.resize();
    deviceStatus.resize();
    if (projectTypeChart.value) {
      try {
        const chart = echarts.getInstanceByDom(projectTypeChart.value);
        chart && chart.resize();
      } catch (e) {
        console.log(e);
      }
    }
  });
};

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  nextTick(async () => {
    initCanvas();
    window.addEventListener('resize', handleResize);

    // 初始化所有图表
    await initCharts();

    // 首次获取数据
    await refreshData();

    // 设置定时刷新（每5分钟刷新一次）
    dataRefreshInterval = setInterval(refreshData, 5 * 60 * 1000);
  });
});

onUnmounted(() => {
  clearInterval(timeInterval);
  clearInterval(dataRefreshInterval);
  window.removeEventListener('resize', () => { });
  cleanup();
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
.icon-contract,
.icon-delegate,
.icon-report,
.icon-task,
.icon-test,
.icon-device {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.icon-contract {
  background-image: url('@/assets/images/icons/contract.png');
}

.icon-delegate {
  background-image: url('@/assets/images/icons/delegate.png');
}

.icon-report {
  background-image: url('@/assets/images/icons/report.png');
}

.icon-task {
  background-image: url('@/assets/images/icons/task.png');
}

.icon-test {
  background-image: url('@/assets/images/icons/test.png');
}

.icon-device {
  background-image: url('@/assets/images/icons/device.png');
}

/* 3D旋转立方体 */
.cube {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #00f2ff, #0066ff);
  transform: rotateY(0deg);
  animation: spin 3s linear infinite;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

/* 粒子效果容器 */
#particles-js {
  width: 100%;
  height: 100%;
  background-color: transparent;
}

/* 流光效果 */
.glow-line {
  position: relative;
  width: 200px;
  height: 2px;
  background: linear-gradient(to right, transparent, #00f2ff, transparent);
  opacity: 0.6;
  animation: moveGlow 2s infinite linear;
}

@keyframes moveGlow {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.perspective-1000 {
  perspective: 1000px;
}

/* 背景网格 */
.bg-grid {
  background-image: linear-gradient(#1d2b53 1px, transparent 1px),
    linear-gradient(90deg, #1d2b53 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.1;
}

/* 背景点阵 */
.bg-dots {
  background-image: radial-gradient(#4db3ff 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.05;
  animation: float 20s linear infinite;
}

/* 扫描线 */
.scan-line {
  opacity: 0.3;
  background: linear-gradient(to bottom,
      transparent 0%,
      rgba(77, 179, 255, 0.1) 48%,
      rgba(77, 179, 255, 0.4) 50%,
      rgba(77, 179, 255, 0.1) 52%,
      transparent 100%);
  background-size: 100% 200%;
  animation: scan 6s linear infinite;
}

/* 科技感圆环 */
.tech-circle {
  border: 1px solid rgba(77, 179, 255, 0.2);
  border-radius: 50%;
  box-shadow:
    inset 0 0 30px rgba(77, 179, 255, 0.2),
    0 0 30px rgba(77, 179, 255, 0.2);
  animation: pulse 8s ease-in-out infinite;
}

/* 科技感线条 */
.tech-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(to top,
      rgba(77, 179, 255, 0.8),
      transparent);
  animation: glow 2s ease-in-out infinite;
}

/* 角落装饰 */
.corner-decoration {
  border-top: 2px solid rgba(77, 179, 255, 0.5);
  border-left: 2px solid rgba(77, 179, 255, 0.5);
  opacity: 0.7;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-20px);
  }
}

@keyframes scan {
  0% {
    background-position: 0 -200%;
  }

  100% {
    background-position: 0 200%;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.02);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

@keyframes glow {
  0% {
    opacity: 0.3;
    height: 40px;
  }

  50% {
    opacity: 0.8;
    height: 60px;
  }

  100% {
    opacity: 0.3;
    height: 40px;
  }
}

canvas {
  pointer-events: auto !important;
  opacity: 0.8;
  mix-blend-mode: screen;
}

/* 调整z-index层级 */
.z-10 {
  z-index: 10;
}

.z-15 {
  z-index: 15;
}

.z-20 {
  z-index: 20;
}

.z-25 {
  z-index: 25;
}

.z-30 {
  z-index: 30;
}

/* 标题图标样式 */
.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding-left: 20px;
}

.title-with-icon::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-image: url('@/assets/images/texticon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 为项目类型图表添加特定的点颜色 */
.bg-dot-1 {
  background-color: #4db3ff;
}

.bg-dot-2 {
  background-color: #3285ff;
}

.bg-dot-3 {
  background-color: #1e5eff;
}

.bg-dot-4 {
  background-color: #0938ff;
}

.bg-dot-5 {
  background-color: #ffc107;
}

/* 添加慢速旋转动画 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
</style>