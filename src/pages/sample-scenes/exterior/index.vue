<script setup lang="ts">
import SampleScenesTable from '@/layouts/components/sample-scenes/SampleScenesTable.vue';
const type = ref("exterior")
</script>

<template>
  <SampleScenesTable :type="type" />
</template>
