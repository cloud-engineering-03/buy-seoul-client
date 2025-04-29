<template>
  <div class="min-h-screen bg-gray-50">
    <HeroSection />
    <ProjectFeaturesSection />
    <TechStackSection />
    <TeamSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import TeamSection from "@/components/landing/TeamSection.vue";
import ContactSection from "@/components/landing/ContactSection.vue";
import ProjectFeaturesSection from "@/components/landing/ProjectFeaturesSection.vue";
import TechStackSection from "@/components/landing/TechStackSection.vue";
import HeroSection from "@/components/landing/HeroSection.vue";
</script>
