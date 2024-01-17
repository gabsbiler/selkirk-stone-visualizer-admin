<script setup lang="ts">
const stones = [
  {
    image: '/temp/stones/aged_brick/Ashen.jpg',
    name: 'Hedge Stone',
    variant: 'Brown',
    views: 1234,
  },
  {
    image: '/temp/stones/aged_brick/Bisque.jpg',
    name: 'Aged Brick',
    variant: 'Bisque',
    views: 4321,
  },
  {
    image: '/temp/stones/aged_brick/Ashen.jpg',
    name: 'Hedge Stone',
    variant: 'Brown',
    views: 1234,
  },
  {
    image: '/temp/stones/aged_brick/Bisque.jpg',
    name: 'Aged Brick',
    variant: 'Bisque',
    views: 4321,
  },
  {
    image: '/temp/stones/aged_brick/Bisque.jpg',
    name: 'Aged Brick',
    variant: 'Bisque',
    views: 4321,
  },
]

const formatNumber = num => {
  if (num < 1000)
    return num.toString() // if less than 1000, return the number

  else if (num < 1000000)
    return `${(num / 1000).toFixed(2)}k` // convert to 'k' for thousands

  else
    return `${(num / 1000000).toFixed(2)}M` // convert to 'M' for millions
}
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex justify-space-between align-center mt-3">
      <h5 class="text-h6">
        Top 3 Collected Stone Variant
      </h5>

      <VBtn variant="text">
        View More
      </VBtn>
    </VCardTitle>
    <VCardText>
      <div
        v-for="(stone, index) in stones"
        :key="stone.name + stone.variant"
        class="d-flex pa-2 gap-x-3 align-center"
      >
        <div>
          <VImg
            :width="150"
            :height="80"
            aspect-ratio="16/9"
            cover
            :src="stone.image"
            style="border-radius: 5px;"
          />
        </div>
        <div class="d-flex justify-space-between w-100 align-center">
          <div>
            <h6 class="text-h6">
              {{ stone.name }}
            </h6>
            <p class="text-body-1">
              {{ stone.variant }}
            </p>
          </div>

          <div>
            <p class="text-body-1">
              {{ formatNumber(stone.views) }} views
            </p>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
