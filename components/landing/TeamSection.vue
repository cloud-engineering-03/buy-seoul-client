<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          우리 팀을 소개합니다
        </h2>
        <p class="mt-4 text-lg text-gray-500">
          부동산 데이터 분석과 사용자 경험에 대한 전문성을 갖춘 팀입니다
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <TeamCard
          username="BGCho96"
          introduction="데이터로 세상을 더 명확하게 보여드리겠습니다."
        />
        <TeamCard
          username="tevem1207"
          introduction="사용자 친화적인 인터페이스를 설계하고 구현합니다."
        />
        <TeamCard
          username="leeyeonjoo123"
          introduction="데이터를 안전하게 저장하고 처리하는 것을 좋아합니다."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamCard from "./TeamCard.vue";
</script>
