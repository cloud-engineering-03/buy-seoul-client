<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">가격 추이</h3>
    <div class="h-64">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

const chartRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

onMounted(() => {
  if (chartRef.value) {
    Chart.register(...registerables);
    chart = new Chart(chartRef.value, {
      type: "line",
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
        datasets: [
          {
            label: "평균 가격",
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
});
</script>
