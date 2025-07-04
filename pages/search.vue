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
              :disabled="isLoading"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
              :disabled="isLoading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">조회 중...</span>
              <span v-else>{{
                currentStep === steps.length - 1 ? "시세 조회하기" : "다음"
              }}</span>
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
const isLoading = ref(false);

const steps = ["지하철 역 선택", "예산 선택"];

const formatPrice = (price: string) => {
  return Number(price).toLocaleString();
};

const nextStep = async () => {
  if (currentStep.value === 0) {
    if (!selectedStation.value) {
      alert("지하철 역을 선택해주세요");
      return;
    }
    currentStep.value++;
    return;
  }

  if (currentStep.value === 1) {
    if (!minPrice.value || !maxPrice.value) {
      alert("예산 범위를 입력해주세요");
      return;
    }
    await search();
  }
};

const prevStep = () => {
  if (isLoading.value) return;
  currentStep.value--;
};

const search = async () => {
  if (!selectedStation.value) {
    alert("모든 조건을 입력해주세요");
    return;
  }

  isLoading.value = true;
  try {
    // 이제 우리 서버의 /api/search 엔드포인트를 호출합니다.
    const results = await $fetch("/api/search", {
      method: "POST",
      body: {
        stationName: selectedStation.value.name,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
      },
    });
    console.log("검색 결과:", results);

    // if (results && results?.length > 0) {
    //   navigateTo({
    //     path: "/result",
    //     query: {
    //       stationName: selectedStation.value.name,
    //       minPrice: minPrice.value,
    //       maxPrice: maxPrice.value,
    //     },
    //   });
    // } else {
    //   alert("조건에 맞는 추천 지역이 없습니다.");
    // }
  } catch (error: any) {
    console.error("검색 중 오류 발생:", error);
    alert(error.data?.message || "검색 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false;
  }
};
</script>
