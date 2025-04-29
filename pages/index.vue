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
import TeamSection from "@/components/TeamSection.vue";
import ContactSection from "@/components/ContactSection.vue";
import ProjectFeaturesSection from "@/components/ProjectFeaturesSection.vue";
import TechStackSection from "@/components/TechStackSection.vue";
import HeroSection from "@/components/HeroSection.vue";
</script>
