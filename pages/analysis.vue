<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">부동산 시장 분석</h1>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- 필터 섹션 -->
        <div class="lg:col-span-1 space-y-6">
          <RegionFilter />
          <PropertyTypeFilter />
        </div>

        <!-- 차트 섹션 -->
        <div class="lg:col-span-3 space-y-6">
          <PriceTrendChart />
          <TransactionVolumeChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegionFilter from "@/components/analysis/RegionFilter.vue";
import PropertyTypeFilter from "@/components/analysis/PropertyTypeFilter.vue";
import PriceTrendChart from "@/components/analysis/PriceTrendChart.vue";
import TransactionVolumeChart from "@/components/analysis/TransactionVolumeChart.vue";
</script>
