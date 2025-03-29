<template>
    <div class="w-full px-4">
        <div class="bg-white shadow rounded-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">大屏实时数据监控</h1>
            
            <div class="mb-10">
                <BaseChart :options="chartOptions" class="w-full h-[500px]" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-3">实时流量</h2>
                    <p class="text-4xl font-bold">1,258</p>
                    <p class="text-sm opacity-80 mt-2">当前在线用户</p>
                </div>
                
                <div class="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-3">系统负载</h2>
                    <p class="text-4xl font-bold">42%</p>
                    <p class="text-sm opacity-80 mt-2">服务器状态正常</p>
                </div>
                
                <div class="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-3">网络状态</h2>
                    <p class="text-4xl font-bold">98.7%</p>
                    <p class="text-sm opacity-80 mt-2">连接稳定性</p>
                </div>
                
                <div class="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold mb-3">API调用</h2>
                    <p class="text-4xl font-bold">3,721</p>
                    <p class="text-sm opacity-80 mt-2">今日请求总数</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import BaseChart from "@/components/BaseChart.vue";
import { onMounted, onUnmounted } from "vue";
import { useWebSocket } from "@/utils/websocket";

onMounted(() => {
    const ws = useWebSocket("ws://localhost:8080", (data) => {
        try {
            chartOptions.value.series[0].data = data.values || [10, 22, 28, 43, 50, 62, 75];
        } catch (error) {
            console.error('处理数据时出错:', error);
        }
    });

    // 组件卸载时关闭连接
    onUnmounted(() => {
        ws.close();
    });
});

const chartOptions = ref({
    title: { 
        text: "系统性能监控", 
        left: "center",
        textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: { 
        type: "category", 
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {
            fontSize: 14
        }
    },
    yAxis: { 
        type: "value",
        axisLabel: {
            fontSize: 14
        }
    },
    series: [{ 
        name: '性能指标',
        type: "line",
        smooth: true,
        lineStyle: {
            width: 4
        },
        itemStyle: {
            color: '#5470c6'
        },
        data: [10, 22, 28, 43, 50, 62, 75],
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(84, 112, 198, 0.5)'
                }, {
                    offset: 1, color: 'rgba(84, 112, 198, 0.1)'
                }]
            }
        }
    }]
});
</script>