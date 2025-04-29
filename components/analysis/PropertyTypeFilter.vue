<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">부동산 유형</h3>
    <div class="space-y-2">
      <label
        v-for="type in propertyTypes"
        :key="type.value"
        class="flex items-center space-x-2"
      >
        <input
          type="checkbox"
          :value="type.value"
          v-model="selectedTypes"
          class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span class="text-gray-700">{{ type.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const propertyTypes = [
  { value: "apartment", label: "아파트" },
  { value: "officetel", label: "오피스텔" },
  { value: "villa", label: "빌라" },
  { value: "house", label: "단독주택" },
];

const selectedTypes = ref<string[]>([]);
</script>
