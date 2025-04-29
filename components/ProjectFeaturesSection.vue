<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 문제점 섹션 -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          부동산 정보 찾기, 왜 이렇게 어려울까요?
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
        <div class="bg-gray-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">흩어진 정보</h3>
          <p class="text-gray-500">
            여러 사이트를 돌아다니며 정보를 모아야 합니다.
          </p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">복잡한 검색</h3>
          <p class="text-gray-500">수많은 조건을 입력하고 필터링해야 합니다.</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            출퇴근 고려 어려움
          </h3>
          <p class="text-gray-500">
            지하철 노선과 거리를 일일이 확인해야 합니다.
          </p>
        </div>
      </div>

      <!-- 해결책 섹션 -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          우리 서비스가 해결해드립니다
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            지하철 노선 선택만으로 시세 조회
          </h3>
          <p class="text-gray-500">
            원하는 지하철 노선만 선택하면 해당 노선의 시세를 한눈에 볼 수
            있습니다.
          </p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            예산 입력으로 조건부 추천
          </h3>
          <p class="text-gray-500">
            예산을 입력하면 해당 예산으로 살 수 있는 지역을 자동으로
            추천해드립니다.
          </p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-lg">
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            역별 시세 트렌드 제공
          </h3>
          <p class="text-gray-500">
            각 역별 시세 트렌드를 그래프로 확인하여 최적의 거주지를 선택할 수
            있습니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 문제점과 해결책을 보여주는 섹션 컴포넌트
</script>
