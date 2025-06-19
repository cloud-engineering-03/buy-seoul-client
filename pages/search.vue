<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          검색 조건을 입력하세요
        </h1>
        <p class="mt-4 text-lg text-gray-500">
          지하철 노선과 예산을 선택하면 적합한 지역을 추천해드립니다
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <!-- 퍼널 컨텐츠 -->
        <div class="bg-white shadow rounded-lg p-6">
          <!-- 1단계: 지하철 역 선택 -->
          <div v-if="currentStep === 0" class="space-y-6">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">
                출근할 지하철 역을 선택해주세요
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                {{
                  selectedStation
                    ? `${selectedStation.name}역을 선택하셨습니다.`
                    : "역 이름을 검색하거나 목록에서 선택해주세요."
                }}
              </p>
            </div>
            <StationSelector v-model:station="selectedStation" />
          </div>

          <!-- 2단계: 예산 선택 -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">
                예산 범위를 설정해주세요
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                {{
                  minPrice && maxPrice
                    ? `${formatPrice(minPrice)}만원 ~ ${formatPrice(
                        maxPrice
                      )}만원으로 설정하셨습니다.`
                    : "최소 예산과 최대 예산을 입력해주세요."
                }}
              </p>
            </div>
            <div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    최소 예산
                  </label>
                  <input
                    type="number"
                    v-model="minPrice"
                    placeholder="최소"
                    class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    최대 예산
                  </label>
                  <input
                    type="number"
                    v-model="maxPrice"
                    placeholder="최대"
                    class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 네비게이션 버튼 -->
          <div class="mt-8 flex justify-between">
            <button
              v-if="currentStep > 0"
              @click="prevStep"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              이전
            </button>
            <button
              v-else
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-0"
            >
              이전
            </button>
            <button
              @click="nextStep"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ currentStep === steps.length - 1 ? "시세 조회하기" : "다음" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StationSelector from "@/components/StationSelector.vue";

const selectedStation = ref<{ id: string; name: string } | null>(null);
const minPrice = ref("");
const maxPrice = ref("");
const currentStep = ref(0);

const steps = ["지하철 역 선택", "예산 선택"];

const formatPrice = (price: string) => {
  return Number(price).toLocaleString();
};

const nextStep = () => {
  if (currentStep.value === 0 && !selectedStation.value) {
    alert("지하철 역을 선택해주세요");
    return;
  }

  if (currentStep.value === 1) {
    if (!minPrice.value || !maxPrice.value) {
      alert("예산 범위를 입력해주세요");
      return;
    }
    search();
    return;
  }

  currentStep.value++;
};

const prevStep = () => {
  currentStep.value--;
};

const search = () => {
  if (!selectedStation.value || !minPrice.value || !maxPrice.value) {
    alert("모든 조건을 입력해주세요");
    return;
  }

  navigateTo({
    path: "/result",
    query: {
      station: selectedStation.value.id,
      min: minPrice.value,
      max: maxPrice.value,
    },
  });
};
</script>

<style scoped>
.max-h-60 {
  max-height: 15rem;
}
</style>
