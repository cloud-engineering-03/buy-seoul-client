<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">거래량</h3>
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
      type: "bar",
      data: {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
        datasets: [
          {
            label: "거래량",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
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
