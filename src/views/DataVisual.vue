<template>
  <div class="fixed inset-0 w-full h-screen overflow-hidden">
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
          <h1 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white tracking-[0.5em]">试验检测管理驾驶舱</h1>
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
      <div class="flex-1 grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 xl:gap-6 p-4 sm:p-6 md:p-8">
        <!-- 左侧区域 -->
        <div class="col-span-3 space-y-2 sm:space-y-3 md:space-y-4 xl:space-y-6">
          <!-- 合同签订 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">合同签订</h2>
            </div>
            <div class="flex justify-between mb-2 sm:mb-3">
              <div>
                <div class="text-gray-400 text-xs sm:text-sm mb-1">已签数量</div>
                <div class="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">5800个</div>
              </div>
              <div>
                <div class="text-gray-400 text-xs sm:text-sm mb-1">未签数量</div>
                <div class="text-lg sm:text-xl md:text-2xl font-bold text-orange-400">88个</div>
              </div>
            </div>
            <div class="relative h-1.5 sm:h-2 bg-[#1d2b53] rounded-full overflow-hidden">
              <div class="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400" style="width: 60%"></div>
            </div>
            <div class="flex justify-between mt-1 text-xs sm:text-sm text-gray-400">
              <div>已签 60%</div>
              <div>未签 40%</div>
            </div>
          </div>

          <!-- 合同数量趋势 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">合同数量趋势</h2>
            </div>
            <div ref="contractTrendChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>

          <!-- 合作区域分布 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">合作区域分布</h2>
            </div>
            <div ref="regionChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>
        </div>

        <!-- 中间区域 -->
        <div class="col-span-6 flex flex-col space-y-2 sm:space-y-3 md:space-y-4 xl:space-y-6 border border-[green] relative -top-4">
          <!-- 地图区域 -->
          <div class="flex-1 bg-[#1d2b53]/40 rounded-lg border border-[#1d2b53] relative overflow-hidden">
            <!-- 背景光效 -->
            <div class="absolute inset-0 bg-grid"></div>
            <div class="absolute inset-0 bg-dots"></div>
            
            <!-- 地图容器 -->
            <div ref="chinaMapChart" class="w-full h-full relative z-10"></div>
            
            <!-- 粒子效果 -->
            <div id="particles-js" class="absolute inset-0 pointer-events-none"></div>
            
            <!-- 扫描线效果 -->
            <div class="absolute inset-0 scan-line"></div>
            
            <!-- 地图底座 -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
              <!-- 光环组 -->
              <div class="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[140%] aspect-[4/1]">
                <div class="absolute inset-0 tech-circle"></div>
                <div class="absolute inset-[10%] tech-circle" style="animation-delay: -2s"></div>
                <div class="absolute inset-[20%] tech-circle" style="animation-delay: -4s"></div>
              </div>
              
              <!-- 发光线条 -->
              <div class="absolute bottom-0 left-0 w-full flex justify-between">
                <div class="tech-line"></div>
                <div class="tech-line" style="animation-delay: -1s"></div>
                <div class="tech-line" style="animation-delay: -2s"></div>
              </div>
            </div>

            <!-- 四角装饰 -->
            <div class="absolute top-0 left-0 w-20 h-20 corner-decoration"></div>
            <div class="absolute top-0 right-0 w-20 h-20 corner-decoration rotate-90"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 corner-decoration -rotate-90"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 corner-decoration rotate-180"></div>
          </div>
          <!-- 数据统计卡片 -->
          <div class="grid grid-cols-6 gap-4 border border-[blue] mt-auto">
            <div v-for="(item, index) in statisticsData" :key="index"
              class="relative group">
                <!-- 标题 -->
                <div class="text-[16px] font-[500] text-[#26DEFF] leading-none font-['PingFang_SC'] text-center border border-[#1d2b53] rounded-lg p-2 mb-2 bg-[#1d2b53]/40">{{ item.title }}</div>
              <!-- 卡片背景 -->
              <div class="bg-[#1d2b53]/40 p-2 rounded-lg border border-[#1d2b53] flex flex-col items-center  m-h-30">
                <!-- 图标 -->
                <div class="w-12 h-12 mb-2 relative ">
                  <img :src="item.icon" alt="icon" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                  <!-- 发光效果 -->
                  <div class="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <!-- 数值 -->
                <div class="text-2xl font-bold text-[#4db3ff]  ">{{ item.value }}</div>
              
              </div>
              <!-- 底部发光线 -->
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-[#4db3ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="col-span-3 space-y-2 sm:space-y-3 md:space-y-4 xl:space-y-6">
          <!-- 报告勘误 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">报告勘误</h2>
            </div>
            <div class="relative">
              <div ref="reportCorrectionChart" class="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 xl:w-48 xl:h-48 mx-auto"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div class="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-blue-400">50%</div>
                <div class="text-xs sm:text-sm text-gray-400">待勘误</div>
              </div>
            </div>
          </div>

          <!-- 报告进展 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">报告进展</h2>
            </div>
            <div ref="reportProgressChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>

          <!-- 设备情况 -->
          <div class="bg-[#1d2b53]/40 p-2 sm:p-3 md:p-4 xl:p-5 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <div class="w-1 h-3 sm:h-4 bg-blue-500"></div>
              <h2 class="text-sm sm:text-base md:text-lg font-medium text-white">设备情况</h2>
            </div>
            <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div class="bg-[#2a3a6a] p-2 sm:p-3 md:p-4 rounded-lg">
                <div class="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">设备总数</div>
                <div class="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400">9999</div>
                <div class="text-xs sm:text-sm text-green-400 mt-1 sm:mt-2">本月新增设备 <span class="ml-1">↑50台</span></div>
              </div>
              <div class="bg-[#2a3a6a] p-2 sm:p-3 md:p-4 rounded-lg">
                <div class="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">设备种类</div>
                <div class="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400">9999</div>
                <div class="text-xs sm:text-sm text-green-400 mt-1 sm:mt-2">本月新增种类 <span class="ml-1">↑50种</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

// 图表实例
const contractTrendChart = ref(null);
const regionChart = ref(null);
const chinaMapChart = ref(null);
const reportCorrectionChart = ref(null);
const reportProgressChart = ref(null);
const deviceStatusChart = ref(null);

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

// 创建注册中国地图
const registerMap = async () => {
  try {
    try {
      // 先尝试从网络获取中国地图数据
      const chinaJson = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
        .then(res => res.json());
      // 注册地图
      echarts.registerMap('china', chinaJson);
      return true;
    } catch (networkError) {
      console.warn('从网络加载中国地图失败，尝试从本地加载:', networkError);
      // 从本地加载
      const chinaJson = await fetch('/china.json')
        .then(res => res.json());
      // 注册地图
      echarts.registerMap('china', chinaJson);
      return true;
    }
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
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        startAngle: 0,
        label: {
          show: false
        },
        emphasis: {
          scale: false
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
              color: '#374151'
            } 
          }
        ]
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
          color: function(params) {
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
          { 
            value: 22, 
            name: '使用中',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4db3ff' },
                { offset: 1, color: '#2a83ff' }
              ])
            }
          },
          { 
            value: 22, 
            name: '待修',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ffa94d' },
                { offset: 1, color: '#ff8c1a' }
              ])
            }
          },
          { 
            value: 22, 
            name: '空闲',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#29c1cd' },
                { offset: 1, color: '#1a9ba5' }
              ])
            }
          },
          { 
            value: 22, 
            name: '停用',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#a49fdc' },
                { offset: 1, color: '#7e77c2' }
              ])
            }
          }
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
  });
};

// 测试接口连接
const testApi = async () => {
  try {
    const response = await axios.get('/api/messages');
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API Error:', error);
  }
};

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
  
  // 修改粒子效果初始化
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = () => {
    window.particlesJS("particles-js", {
      particles: {
        number: { 
          value: 100,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        color: { value: "#4db3ff" },
        shape: {
          type: ["circle", "triangle"],
          stroke: {
            width: 0,
            color: "#4db3ff"
          }
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4db3ff",
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.6
            }
          }
        }
      },
      retina_detect: true
    });
  };
  document.head.appendChild(script);

  // 等待DOM渲染完成后初始化图表
  setTimeout(() => {
    initCharts();
    testApi();
  }, 0);
});

onUnmounted(() => {
  clearInterval(timeInterval);
  // 销毁图表实例
  window.removeEventListener('resize', () => {});
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

.icon-contract { background-image: url('@/assets/images/icons/contract.png'); }
.icon-delegate { background-image: url('@/assets/images/icons/delegate.png'); }
.icon-report { background-image: url('@/assets/images/icons/report.png'); }
.icon-task { background-image: url('@/assets/images/icons/task.png'); }
.icon-test { background-image: url('@/assets/images/icons/test.png'); }
.icon-device { background-image: url('@/assets/images/icons/device.png'); }

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
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(77, 179, 255, 0.1) 48%,
    rgba(77, 179, 255, 0.3) 50%,
    rgba(77, 179, 255, 0.1) 52%,
    transparent 100%);
  background-size: 100% 200%;
  animation: scan 4s linear infinite;
}

/* 科技感圆环 */
.tech-circle {
  border: 1px solid rgba(77, 179, 255, 0.3);
  border-radius: 50%;
  box-shadow: 
    inset 0 0 20px rgba(77, 179, 255, 0.2),
    0 0 20px rgba(77, 179, 255, 0.2);
  animation: pulse 6s ease-in-out infinite;
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
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px); }
}

@keyframes scan {
  0% { background-position: 0 -200%; }
  100% { background-position: 0 200%; }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.02); opacity: 0.5; }
  100% { transform: scale(1); opacity: 0.3; }
}

@keyframes glow {
  0% { opacity: 0.3; height: 40px; }
  50% { opacity: 0.8; height: 60px; }
  100% { opacity: 0.3; height: 40px; }
}
</style> 