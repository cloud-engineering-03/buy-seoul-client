<template>
  <div class="w-full h-full">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps<{
  data: {
    labels: string[];
    values: number[];
  };
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

const initChart = () => {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");
  if (!ctx) return;

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: "평균 매매가 (만원)",
          data: props.data.values,
          borderColor: "rgb(79, 70, 229)",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => `${value.toLocaleString()}만원`,
          },
        },
      },
    },
  });
};

watch(
  () => props.data,
  () => {
    if (chart) {
      chart.destroy();
    }
    initChart();
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});
</script>
