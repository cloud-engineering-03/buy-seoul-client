<template>
  <div class="h-64">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

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

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartRef.value, {
    type: "line",
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: "시세 추이",
          data: props.data.values,
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
};

onMounted(initChart);
watch(() => props.data, initChart, { deep: true });
</script>
