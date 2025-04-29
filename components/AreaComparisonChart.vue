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
    type: "bar",
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: "평균 매매가",
          data: props.data.values,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
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
