<template>
  <div class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          간단한 3단계로 시작하세요
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          복잡한 과정 없이, 지하철 노선과 예산만으로 시작할 수 있습니다
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="relative">
          <div
            class="absolute top-0 left-0 w-full h-full bg-indigo-50 rounded-lg transform -rotate-1"
          ></div>
          <div class="relative bg-white p-6 rounded-lg shadow-lg">
            <div
              class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
            >
              <span class="text-xl font-bold">1</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              지하철 노선 선택
            </h3>
            <p class="text-gray-500">
              출퇴근에 사용하는 지하철 노선을 선택하세요.
            </p>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute top-0 left-0 w-full h-full bg-indigo-50 rounded-lg transform rotate-1"
          ></div>
          <div class="relative bg-white p-6 rounded-lg shadow-lg">
            <div
              class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
            >
              <span class="text-xl font-bold">2</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">예산 입력</h3>
            <p class="text-gray-500">희망하는 예산 범위를 입력하세요.</p>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute top-0 left-0 w-full h-full bg-indigo-50 rounded-lg transform -rotate-1"
          ></div>
          <div class="relative bg-white p-6 rounded-lg shadow-lg">
            <div
              class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-4"
            >
              <span class="text-xl font-bold">3</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              추천 지역 확인
            </h3>
            <p class="text-gray-500">예산에 맞는 지역과 시세를 확인하세요.</p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <a
          href="#"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          내 지하철 노선 시세 확인하기
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 서비스 사용 방법 안내 섹션 컴포넌트
</script>
