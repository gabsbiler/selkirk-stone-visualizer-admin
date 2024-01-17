<script setup lang="ts">
const cardsContent = ref([
  {
    title: 'Session',
    number: 1234,
    difference: 12,
    icon: {
      color: 'warning',
      icon: 'mdi-chart-timeline-variant',
    },
  },
  {
    title: 'Ave. Session Rate',
    number: 45,
    difference: 14,
    icon: {
      color: 'success',
      icon: 'mdi-chart-timeline-variant',
    },
  },
  {
    title: 'Time on Site',
    number: 45,
    difference: 14,
    icon: {
      color: 'text',
      icon: 'mdi-clock',
    },
  },
  {
    title: 'Bounce Rate',
    number: 45,
    difference: 14,
    icon: {
      color: 'error',
      icon: 'mdi-chart-pie',
    },
  },
])
</script>

<template>
  <section>
    <VRow>
      <VCol
        v-for="item in cardsContent"
        :key="item.title"
      >
        <VCard height="170px">
          <VCardText class="d-flex align-stretch h-100">
            <VRow>
              <VCol>
                <h6 class="text-h6">
                  {{ item.title }}
                </h6>
                <div class="d-flex align-center">
                  <h6 class="text-h4">
                    {{ item.number }}
                  </h6>

                  <p class="text-success text-body-2 ma-0 mx-1">
                    (+{{ item.difference }}%)
                  </p>
                </div>
              </VCol>
              <VCol
                cols="4"
                class="d-flex justify-end"
              >
                <VBtn
                  :icon="item.icon.icon"
                  :color="item.icon.color"
                  size="small"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
