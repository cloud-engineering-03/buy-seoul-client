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
          :class="[
            'absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200',
            hoveredDistrict &&
            hoveredDistrict !== selectedDistrict &&
            districts
              .find((d) => d.name === hoveredDistrict)
              ?.stations.some((s) => s.id === station.id)
              ? 'bg-slate-500 scale-110 z-10'
              : selectedDistrict &&
                districts
                  .find((d) => d.name === selectedDistrict)
                  ?.stations.some((s) => s.id === station.id)
              ? 'bg-indigo-500 scale-125 z-10'
              : 'bg-slate-500 hover:scale-110',
          ]"
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

        <!-- 마커 팝업: 요약만 간결하게 표시 -->
        <div
          v-if="hoveredDistrict"
          class="absolute top-4 right-4 w-64 bg-white rounded-lg shadow-lg p-3 border border-indigo-200"
        >
          <h3 class="text-base font-semibold text-gray-900 mb-1">
            {{ hoveredDistrict }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ districtStations.length }}개 역 포함 · 평균
            {{ formatPrice(avgPrice) }}만원
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div
          :id="`district-${district.name}`"
          v-for="district in districts"
          :key="district.name"
          class="transition cursor-pointer"
          :class="[
            'p-4 bg-white rounded-lg shadow border',
            selectedDistrict === district.name
              ? 'border-indigo-600 border-2 shadow-lg scale-[1.02]'
              : 'hover:border-indigo-500',
          ]"
          @click="selectDistrict(district.name)"
          @mouseenter="hoveredDistrict = district.name"
          @mouseleave="hoveredDistrict = null"
        >
          <h3 class="text-xl font-bold text-gray-900 mb-1">
            {{ district.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            {{ district.stations.length }}개 역 포함
          </p>

          <div class="text-sm text-gray-700 space-y-1 mb-3">
            <p>📊 평균 시세: {{ formatPrice(getAvgPrice(district)) }}만원</p>
            <p>🏠 예상 매물 수: {{ district.stations.length * 3 }}건</p>
          </div>

          <p class="text-sm text-gray-500 italic truncate">
            "{{ district.recommendation }}"
          </p>

          <button
            class="mt-3 text-right text-sm text-indigo-600 font-medium underline"
            @click.stop="navigateTo(`/district/${district.name}`)"
          >
            상세 페이지 보기
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
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: "2",
    name: "홍대입구역",
    line: "2",
    avgPrice: 120000,
    lat: 37.5572,
    lng: 126.9238,
  },
  {
    id: "3",
    name: "선릉역",
    line: "2",
    avgPrice: 130000,
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
import { nextTick, ref, computed } from "vue";

const selectedDistrict = ref<string | null>(null);

const handleMarkerClick = (station: Station) => {
  const district = districts.value.find((d) =>
    d.stations.some((s) => s.id === station.id)
  );
  if (district) {
    selectedDistrict.value = district.name;
    hoveredDistrict.value = district.name;
    nextTick(() => {
      document
        .getElementById(`district-${district.name}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
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

const hoveredDistrict = ref<string | null>(null);

interface District {
  name: string;
  stations: Station[];
  recommendation: string;
}

const districts = ref<District[]>([
  {
    name: "강남구",
    stations: [stations.value[0], stations.value[2]],
    recommendation: "강남구 중심부에 위치한 역세권으로 접근성이 매우 좋습니다.",
  },
  {
    name: "마포구",
    stations: [stations.value[1]],
    recommendation: "젊은 문화의 중심지로 활기찬 분위기가 특징입니다.",
  },
]);

const districtStations = computed(() => {
  return (
    districts.value.find((d) => d.name === hoveredDistrict.value)?.stations ||
    []
  );
});

const avgPrice = computed(() => {
  if (districtStations.value.length === 0) return 0;
  const total = districtStations.value.reduce((sum, s) => sum + s.avgPrice, 0);
  return Math.round(total / districtStations.value.length);
});

const listingsCount = computed(() => {
  // TODO: Replace with actual data
  return districtStations.value.length * 3;
});
const getAvgPrice = (district: District): number => {
  if (district.stations.length === 0) return 0;
  const total = district.stations.reduce((sum, s) => sum + s.avgPrice, 0);
  return Math.round(total / district.stations.length);
};

const selectDistrict = (districtName: string) => {
  selectedDistrict.value = districtName;
  hoveredDistrict.value = districtName;
};
</script>
