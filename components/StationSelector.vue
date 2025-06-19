<template>
  <div class="relative" ref="dropdownRef">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @focus="isOpen = true"
        @input="filterStations"
        placeholder="역을 검색하세요"
        class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <div
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
      >
        <template v-for="line in filteredLines" :key="line.id">
          <div
            v-if="line.stations.length > 0"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50"
          >
            {{ line.name }}
          </div>
          <div
            v-for="station in line.stations"
            :key="station.id"
            class="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-indigo-50"
            @click="selectStation(station)"
          >
            <span class="block truncate">{{ station.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <div v-if="props.station" class="mt-2">
      <span
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
      >
        {{ props.station.name }}
        <button
          type="button"
          class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
          @click="clearSelection"
        >
          <span class="sr-only">선택 해제</span>
          <svg
            class="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

interface Station {
  id: string;
  name: string;
}

interface Line {
  id: string;
  name: string;
  stations: Station[];
}

const props = defineProps<{
  station: Station | null;
}>();

const emit = defineEmits<{
  (e: "update:station", value: Station | null): void;
}>();

const subwayLines: Line[] = [
  {
    id: "1",
    name: "1호선",
    stations: [
      { id: "101", name: "서울" },
      { id: "102", name: "시청" },
      { id: "103", name: "종각" },
    ],
  },
  {
    id: "2",
    name: "2호선",
    stations: [
      { id: "201", name: "을지로입구" },
      { id: "202", name: "을지로3가" },
      { id: "203", name: "충정로" },
    ],
  },
];

const searchQuery = ref("");
const isOpen = ref(false);

const dropdownRef = ref<HTMLElement | null>(null);

const filterStations = () => {
  isOpen.value = true;
};

const filteredLines = computed(() =>
  searchQuery.value
    ? subwayLines.map((line) => ({
        ...line,
        stations: line.stations.filter((station) =>
          station.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        ),
      }))
    : subwayLines
);

const selectStation = (station: Station) => {
  emit("update:station", station);
  searchQuery.value = station.name;
  isOpen.value = false;
};

const clearSelection = () => {
  emit("update:station", null);
  searchQuery.value = "";
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && isOpen.value) {
    const first = filteredLines.value.find((l) => l.stations.length > 0)
      ?.stations[0];
    if (first) selectStation(first);
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
