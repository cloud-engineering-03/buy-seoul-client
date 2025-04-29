<template>
  <div
    class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">
          {{ station.name }}
        </h3>
        <span
          class="px-2 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full"
        >
          {{ station.line }}호선
        </span>
      </div>

      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500">평균 매매가</p>
          <p class="text-xl font-semibold text-gray-900">
            {{ formatPrice(station.avgPrice) }}만원
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">추천 포인트</p>
          <p class="text-gray-600">{{ station.recommendation }}</p>
        </div>
      </div>

      <div class="mt-6">
        <button
          @click="viewDetail"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          상세 정보 보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  station: {
    id: string;
    name: string;
    line: string;
    avgPrice: number;
    recommendation: string;
  };
}>();

const formatPrice = (price: number) => {
  return price.toLocaleString();
};

const viewDetail = () => {
  navigateTo(`/detail/${props.station.id}`);
};
</script>
