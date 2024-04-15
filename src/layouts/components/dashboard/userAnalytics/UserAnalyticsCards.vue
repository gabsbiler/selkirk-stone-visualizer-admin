<script setup lang="ts">
import type { AnyObject } from '@casl/ability/dist/types/types'

const props = defineProps<{
  loading: boolean
  data: AnyObject
}>()

const { loading, data } = toRefs(props)

watchDebounced(data, () => {
  const value = data.value || []
  const cardsContentCopy = JSON.parse(JSON.stringify(cardsContent.value))
  const sessionTotal = value.reduce((a, b) => a + b.Count, 0)
  const hourTimeSpentTotal = value.reduce((a, b) => a + (Math.abs(new Date(b.SessionEnd).getTime() - new Date(b.SessionStart).getTime()) / 3600000), 0)
  const bounceRate = value.filter(x => x.Count === 1).length

  cardsContentCopy[0].number = sessionTotal
  cardsContentCopy[1].number = sessionTotal / value.length
  cardsContentCopy[2].number = hourTimeSpentTotal / value.length
  cardsContentCopy[3].number = (bounceRate / value.length) * 100
  cardsContent.value = cardsContentCopy
}, {})

const cardsContent = ref([
  {
    title: 'Session',
    number: 0,
    difference: 12,
    icon: {
      color: 'warning',
      icon: 'mdi-chart-timeline-variant',
    },
  },
  {
    title: 'Ave. Session Rate',
    number: 0,
    difference: 14,
    icon: {
      color: 'success',
      icon: 'mdi-chart-timeline-variant',
    },
  },
  {
    title: 'Time on Site',
    number: 0,
    difference: 14,
    suffix: 'h',
    icon: {
      color: 'text',
      icon: 'mdi-clock',
    },
  },
  {
    title: 'Bounce Rate',
    number: 0,
    difference: 14,
    suffix: '%',
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
        <VCard
          height="170px"
          :loading="loading"
        >
          <VCardText class="d-flex align-stretch h-100">
            <VRow>
              <VCol>
                <h6 class="text-h6">
                  {{ item.title }}
                </h6>
                <div class="d-flex align-center">
                  <h6 class="text-h4">
                    {{ item.number.toFixed(2) }}{{ item.suffix }}
                  </h6>
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
