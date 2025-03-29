<template>
  <div class="fixed inset-0 w-full h-screen overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0" 
      :style="{ background: `url(${backgroundImageUrl}) no-repeat center center / cover` }">
    </div>
    <!-- 半透明遮罩 -->
    <div class="absolute inset-0 bg-[#0d1733]/95"></div>
    <!-- 内容区域 -->
    <div class="relative z-10 w-full h-full flex flex-col px-8 py-4">
      <!-- 顶部标题 -->
      <div class="flex justify-center items-center h-16 relative">
        <div class="absolute left-0 flex items-center">
          <div class="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
            <i class="text-lg">📊</i>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white tracking-widest">试验检测管理驾驶舱</h1>
        <div class="absolute right-0 flex items-center gap-4">
          <div class="text-gray-400 text-sm">{{ currentTime }}</div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex-1 grid grid-cols-12 gap-4 mt-4">
        <!-- 左侧区域 -->
        <div class="col-span-3 space-y-4">
          <!-- 合同签订 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">合同签订</h2>
            </div>
            <div class="flex justify-between mb-3">
              <div>
                <div class="text-gray-400 text-xs mb-1">已签数量</div>
                <div class="text-xl font-bold text-blue-400">5800个</div>
              </div>
              <div>
                <div class="text-gray-400 text-xs mb-1">未签数量</div>
                <div class="text-xl font-bold text-orange-400">88个</div>
              </div>
            </div>
            <div class="relative h-2 bg-[#1d2b53] rounded-full overflow-hidden">
              <div class="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400" style="width: 60%"></div>
            </div>
            <div class="flex justify-between mt-1 text-xs text-gray-400">
              <div>已签 60%</div>
              <div>未签 40%</div>
            </div>
          </div>

          <!-- 合同数量趋势 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">合同数量趋势</h2>
            </div>
            <div ref="contractTrendChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>

          <!-- 合作区域分布 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">合作区域分布</h2>
            </div>
            <div ref="regionChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>
        </div>

        <!-- 中间区域 -->
        <div class="col-span-6 space-y-4">
          <!-- 地图区域 -->
          <div class="bg-[#1d2b53]/40 rounded-lg border border-[#1d2b53] h-[calc(60vh-2rem)]">
            <div ref="chinaMapChart" class="w-full h-full"></div>
          </div>
          <!-- 数据统计卡片 -->
          <div class="grid grid-cols-6 gap-4">
            <div v-for="(item, index) in statisticsData" :key="index"
              class="bg-[#1d2b53]/40 p-3 rounded-lg border border-[#1d2b53] flex flex-col items-center">
              <div class="text-gray-300 text-sm mb-2">{{ item.title }}</div>
              <div class="text-xl font-bold mb-2" :class="item.color">{{ item.value }}</div>
              <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <i :class="item.icon" class="text-lg text-blue-400"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧区域 -->
        <div class="col-span-3 space-y-4">
          <!-- 报告勘误 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">报告勘误</h2>
            </div>
            <div class="relative">
              <div ref="reportCorrectionChart" class="w-40 h-40 mx-auto"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div class="text-2xl font-bold text-blue-400">50%</div>
                <div class="text-xs text-gray-400">待勘误</div>
              </div>
            </div>
          </div>

          <!-- 报告进展 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53] h-[calc(30vh-2rem)]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">报告进展</h2>
            </div>
            <div ref="reportProgressChart" class="w-full h-[calc(100%-2rem)]"></div>
          </div>

          <!-- 设备情况 -->
          <div class="bg-[#1d2b53]/40 p-4 rounded-lg border border-[#1d2b53]">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-1 h-4 bg-blue-500"></div>
              <h2 class="text-base font-medium text-white">设备情况</h2>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-[#2a3a6a] p-3 rounded-lg">
                <div class="text-xs text-gray-400 mb-2">设备总数</div>
                <div class="text-xl font-bold text-cyan-400">9999</div>
                <div class="text-xs text-green-400 mt-2">本月新增设备 <span class="ml-1">↑50台</span></div>
              </div>
              <div class="bg-[#2a3a6a] p-3 rounded-lg">
                <div class="text-xs text-gray-400 mb-2">设备种类</div>
                <div class="text-xl font-bold text-cyan-400">9999</div>
                <div class="text-xs text-green-400 mt-2">本月新增种类 <span class="ml-1">↑50种</span></div>
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
  { title: '合同数', value: '5888', color: 'text-[#4db3ff]', icon: 'icon-contract' },
  { title: '委托量', value: '5888', color: 'text-[#3f9]', icon: 'icon-delegate' },
  { title: '报告审批量', value: '5666', color: 'text-[#29c1cd]', icon: 'icon-report' },
  { title: '任务完成量', value: '5800', color: 'text-[#a49fdc]', icon: 'icon-task' },
  { title: '检测数据', value: '128', color: 'text-[#39c0c8]', icon: 'icon-test' },
  { title: '设备数', value: '358', color: 'text-[#4ea8ff]', icon: 'icon-device' }
]);

// 背景图片URL
const backgroundImageUrl = ref(backgroundImage);

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
  // 等待DOM渲染完成后初始化图表
  setTimeout(() => {
    initCharts();
    // 测试接口
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
</style> 