<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">지역 선택</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >시/도</label
        >
        <select
          v-model="selectedCity"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">전체</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="인천">인천</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >구/군</label
        >
        <select
          v-model="selectedDistrict"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">전체</option>
          <option
            v-for="district in districts"
            :key="district"
            :value="district"
          >
            {{ district }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const selectedCity = ref("");
const selectedDistrict = ref("");
const districts = ref<string[]>([]);

watch(selectedCity, (newCity) => {
  selectedDistrict.value = "";
  if (newCity === "서울") {
    districts.value = ["강남구", "서초구", "송파구", "마포구", "종로구"];
  } else if (newCity === "부산") {
    districts.value = ["해운대구", "수영구", "남구", "동구"];
  } else if (newCity === "인천") {
    districts.value = ["남동구", "부평구", "계양구", "서구"];
  } else {
    districts.value = [];
  }
});
</script>
