<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          추천 지역 목록
        </h1>
        <p class="mt-4 text-lg text-gray-500">
          선택하신 조건에 맞는 지역을 추천해드립니다
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="station in stations"
          :key="station.id"
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
                @click="viewDetail(station.id)"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                상세 정보 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { line, min, max } = route.query;

// TODO: API 연동 후 실제 데이터로 교체
const stations = ref([
  {
    id: "1",
    name: "강남역",
    line: "2",
    avgPrice: 150000,
    recommendation: "강남구 중심부에 위치한 역세권으로 접근성이 매우 좋습니다.",
  },
  {
    id: "2",
    name: "홍대입구역",
    line: "2",
    avgPrice: 120000,
    recommendation: "젊은 문화의 중심지로 활기찬 분위기가 특징입니다.",
  },
  {
    id: "3",
    name: "잠실역",
    line: "2",
    avgPrice: 130000,
    recommendation: "대규모 아파트 단지와 상업시설이 잘 갖춰져 있습니다.",
  },
]);

const formatPrice = (price: number) => {
  return price.toLocaleString();
};

const viewDetail = (stationId: string) => {
  navigateTo(`/detail/${stationId}`);
};
</script>
