<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <!-- 헤더 섹션 -->
        <div class="px-6 py-8 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-extrabold text-gray-900">
                {{ station.name }}
              </h1>
              <p class="mt-2 text-lg text-gray-500">{{ station.line }}호선</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">평균 매매가</p>
              <p class="text-2xl font-semibold text-indigo-600">
                {{ formatPrice(station.avgPrice) }}만원
              </p>
            </div>
          </div>
        </div>

        <!-- 주요 정보 섹션 -->
        <div class="px-6 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 시세 트렌드 -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                시세 트렌드
              </h2>
              <div
                class="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center"
              >
                <!-- TODO: 차트 컴포넌트 추가 -->
                <p class="text-gray-500">시세 트렌드 차트가 표시됩니다</p>
              </div>
            </div>

            <!-- 주변 정보 -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                주변 정보
              </h2>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">추천 포인트</p>
                  <p class="text-gray-900">{{ station.recommendation }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">주요 시설</p>
                  <ul class="mt-2 space-y-2">
                    <li
                      v-for="facility in station.facilities"
                      :key="facility"
                      class="flex items-center text-gray-600"
                    >
                      <svg
                        class="h-5 w-5 text-indigo-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {{ facility }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA 섹션 -->
        <div class="px-6 py-8 bg-gray-50">
          <div class="flex justify-center">
            <button
              @click="goBack"
              class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              다른 지역 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const stationId = route.params.station;

// TODO: API 연동 후 실제 데이터로 교체
const station = ref({
  id: "1",
  name: "강남역",
  line: "2",
  avgPrice: 150000,
  recommendation: "강남구 중심부에 위치한 역세권으로 접근성이 매우 좋습니다.",
  facilities: ["대형 쇼핑몰", "영화관", "공원", "학교", "병원"],
});

const formatPrice = (price: number) => {
  return price.toLocaleString();
};

const goBack = () => {
  navigateTo("/result");
};
</script>
