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
                시세 분석
              </h2>
              <div class="flex space-x-2 mb-4">
                <button
                  @click="activeChart = 'trend'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    activeChart === 'trend'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  시세 추이
                </button>
                <button
                  @click="activeChart = 'volume'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    activeChart === 'volume'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  거래량
                </button>
                <button
                  @click="activeChart = 'comparison'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium',
                    activeChart === 'comparison'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ]"
                >
                  인근 지역 비교
                </button>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 h-64">
                <PriceTrendChart
                  v-if="activeChart === 'trend'"
                  :data="trendData"
                />
                <TransactionVolumeChart
                  v-else-if="activeChart === 'volume'"
                  :data="volumeData"
                />
                <AreaComparisonChart v-else :data="comparisonData" />
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
                      <CheckIcon class="size-5 mr-2" />
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
import PriceTrendChart from "@/components/PriceTrendChart.vue";
import TransactionVolumeChart from "@/components/TransactionVolumeChart.vue";
import AreaComparisonChart from "@/components/AreaComparisonChart.vue";
import { CheckIcon } from "@heroicons/vue/24/solid";

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

const activeChart = ref<"trend" | "volume" | "comparison">("trend");

// 샘플 데이터 (실제로는 API에서 가져와야 함)
const trendData = ref({
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  values: [65000, 68000, 72000, 75000, 78000, 80000],
});

const volumeData = ref({
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  values: [12, 15, 18, 20, 16, 14],
});

const comparisonData = ref({
  labels: ["역삼동", "개포동", "대치동", "도곡동"],
  values: [80000, 75000, 78000, 72000],
});
</script>
