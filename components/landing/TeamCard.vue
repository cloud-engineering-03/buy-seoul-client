<template>
  <div class="bg-gray-50 p-6 rounded-lg">
    <div class="flex items-center mb-4">
      <img
        :src="userData?.avatar_url"
        :alt="userData?.name ?? username"
        class="h-16 w-16 rounded-full"
      />
      <div class="ml-4">
        <h3 class="text-lg font-medium text-gray-900">
          {{ userData?.name ?? username }}
        </h3>
        <a
          :href="userData?.html_url"
          target="_blank"
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          @{{ username }}
        </a>
      </div>
    </div>
    <div class="space-y-2">
      <p class="text-sm text-gray-600">"{{ introduction }}"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
}

const props = defineProps<{
  username: string;
  introduction: string;
}>();

const userData = ref<GitHubUser | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchUserData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(
      `https://api.github.com/users/${props.username}`
    );

    if (!response.ok) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    userData.value = await response.json();
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUserData();
});
</script>
