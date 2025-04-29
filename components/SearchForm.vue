<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="space-y-6">
      <!-- 지하철 노선 선택 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          지하철 노선 선택
        </label>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="line in subwayLines"
            :key="line.id"
            class="px-4 py-2 border rounded-md text-center hover:bg-indigo-50"
            :class="
              selectedLine === line.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300'
            "
            @click="selectedLine = line.id"
          >
            {{ line.name }}
          </button>
        </div>
      </div>

      <!-- 예산 입력 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          예산 범위 (만원)
        </label>
        <div class="grid grid-cols-2 gap-4">
          <input
            type="number"
            v-model="minPrice"
            placeholder="최소"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            v-model="maxPrice"
            placeholder="최대"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- 검색 버튼 -->
      <div class="pt-4">
        <button
          @click="search"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          시세 조회하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedLine = ref("");
const minPrice = ref("");
const maxPrice = ref("");

const subwayLines = [
  { id: "1", name: "1호선" },
  { id: "2", name: "2호선" },
  { id: "3", name: "3호선" },
  { id: "4", name: "4호선" },
  { id: "5", name: "5호선" },
  { id: "6", name: "6호선" },
  { id: "7", name: "7호선" },
  { id: "8", name: "8호선" },
  { id: "9", name: "9호선" },
];

const emit = defineEmits<{
  (e: "search", params: { line: string; min: string; max: string }): void;
}>();

const search = () => {
  if (!selectedLine.value || !minPrice.value || !maxPrice.value) {
    alert("모든 조건을 입력해주세요");
    return;
  }

  emit("search", {
    line: selectedLine.value,
    min: minPrice.value,
    max: maxPrice.value,
  });
};
</script>
