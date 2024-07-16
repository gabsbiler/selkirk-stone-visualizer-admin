<script setup lang="ts">
import SampleScenesTable from '@/layouts/components/sample-scenes/SampleScenesTable.vue';
const type = ref("mantel")
</script>

<template>
  <SampleScenesTable :type="type" />
</template>
