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

      <!-- 지도 컴포넌트 -->
      <div class="mb-8 h-96 bg-gray-200 rounded-lg relative overflow-hidden">
        <!-- 더미 지도 배경 -->
        <div class="absolute inset-0 bg-gray-300">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <p class="text-gray-600">지도가 여기에 표시됩니다</p>
              <p class="text-sm text-gray-500 mt-2">
                (실제 구현 시 Kakao Maps API를 사용하여 구현 예정)
              </p>
            </div>
          </div>
        </div>

        <!-- 더미 마커들 -->
        <div
          v-for="station in stations"
          :key="station.id"
          class="absolute w-6 h-6 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200"
          :style="{
            left: `${(station.lng - 126.5) * 100}%`,
            top: `${(37.8 - station.lat) * 100}%`,
          }"
          @click="handleMarkerClick(station)"
        >
          <div
            class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-sm font-medium shadow-md whitespace-nowrap"
          >
            {{ station.name }}
          </div>
        </div>

        <!-- 마커 팝업 -->
        <div
          v-if="selectedStation"
          class="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-medium text-gray-900">
              {{ selectedStation.name }}
            </h3>
            <span
              class="px-2 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full"
            >
              {{ selectedStation.line }}호선
            </span>
          </div>
          <div class="space-y-2">
            <div>
              <p class="text-sm text-gray-500">평균 매매가</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ formatPrice(selectedStation.avgPrice) }}만원
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">추천 포인트</p>
              <p class="text-gray-600">{{ selectedStation.recommendation }}</p>
            </div>
          </div>
          <button
            @click="viewDetail(selectedStation.id)"
            class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            상세 정보 보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { line, min, max } = route.query;

interface Station {
  id: string;
  name: string;
  line: string;
  avgPrice: number;
  recommendation: string;
  lat: number;
  lng: number;
}

// 선택된 역 상태
const selectedStation = ref<Station | null>(null);

// TODO: API 연동 후 실제 데이터로 교체
const stations = ref<Station[]>([
  {
    id: "1",
    name: "강남역",
    line: "2",
    avgPrice: 150000,
    recommendation: "강남구 중심부에 위치한 역세권으로 접근성이 매우 좋습니다.",
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: "2",
    name: "홍대입구역",
    line: "2",
    avgPrice: 120000,
    recommendation: "젊은 문화의 중심지로 활기찬 분위기가 특징입니다.",
    lat: 37.5572,
    lng: 126.9238,
  },
  {
    id: "3",
    name: "잠실역",
    line: "2",
    avgPrice: 130000,
    recommendation: "대규모 아파트 단지와 상업시설이 잘 갖춰져 있습니다.",
    lat: 37.5133,
    lng: 127.1001,
  },
]);

const formatPrice = (price: number) => {
  return price.toLocaleString();
};

const viewDetail = (stationId: string) => {
  navigateTo(`/detail/${stationId}`);
};

// 마커 클릭 핸들러
const handleMarkerClick = (station: Station) => {
  selectedStation.value = station;
};

// 팝업 닫기 핸들러
const closePopup = () => {
  selectedStation.value = null;
};

// 지도 영역 클릭 시 팝업 닫기
const handleMapClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("bg-gray-300")) {
    closePopup();
  }
};
</script>
