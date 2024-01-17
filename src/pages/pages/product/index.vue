<script setup lang="ts">
import Category from '@/layouts/components/category/Category.vue'
import CategoryAddDialog from '@/layouts/components/category/CategoryAddDialog.vue'
import axios from '@axios'

// const stones = ref([
//   {
//     name: 'Aged Brick',
//     image: '/temp/stones/aged_brick/Ashen.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Ashen',
//         image: '/temp/stones/aged_brick/Ashen.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/aged_brick/Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Brownstone',
//         image: '/temp/stones/aged_brick/Brownstone.jpg',
//         show: true,
//       },
//       {
//         name: 'Coral',
//         image: '/temp/stones/aged_brick/Coral.jpg',
//         show: true,
//       },
//       {
//         name: 'Ebony',
//         image: '/temp/stones/aged_brick/Ebony.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/aged_brick/Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Old Chicago',
//         image: '/temp/stones/aged_brick/old_chicago.jpg',
//         show: true,
//       },
//       {
//         name: 'Oxford',
//         image: '/temp/stones/aged_brick/Oxford.jpg',
//         show: true,
//       },
//       {
//         name: 'Winterton',
//         image: '/temp/stones/aged_brick/Winterton.jpg',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Chiseled Limestone',
//     image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alabaster',
//         image: '/temp/stones/chiseled_limestone/Alabaster.jpg',
//         show: true,
//       },
//       {
//         name: 'Alpine',
//         image: '/temp/stones/chiseled_limestone/Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/chiseled_limestone/Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Charcoal',
//         image: '/temp/stones/chiseled_limestone/Charcoal.jpg',
//         show: true,
//       },
//       {
//         name: 'Conifer',
//         image: '/temp/stones/chiseled_limestone/Conifer.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/chiseled_limestone/Durango\ Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/chiseled_limestone/Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Sahara',
//         image: '/temp/stones/chiseled_limestone/Sahara.jpg',
//         show: true,
//       },
//       {
//         name: 'Sandstone',
//         image: '/temp/stones/chiseled_limestone/Sandstone.jpg',
//         show: true,
//       },

//     ],
//   },
//   {
//     name: 'Contemporary Brick',
//     image: '/temp/stones/contemporary_brick/Ashen.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Ashen',
//         image: '/temp/stones/contemporary_brick/CB_Ashen.jpg',
//         show: true,
//       },
//       {
//         name: 'Brownstone',
//         image: '/temp/stones/contemporary_brick/CB_Brownstone.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/contemporary_brick/CB_Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Coral',
//         image: '/temp/stones/contemporary_brick/CB_Coral.jpg',
//         show: true,
//       },
//       {
//         name: 'Ebony',
//         image: '/temp/stones/contemporary_brick/CB_Ebony.jpg',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Country Cliffstone',
//     image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alabaster',
//         image: '/temp/stones/country_cliffstone/CC_Alabaster.jpg',
//         show: true,
//       },
//       {
//         name: 'Alpine',
//         image: '/temp/stones/country_cliffstone/CC_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/country_cliffstone/CC_Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Bow Valley',
//         image: '/temp/stones/country_cliffstone/CC_Bow\ Valley.jpg',
//         show: true,
//       },
//       {
//         name: 'Driftwood',
//         image: '/temp/stones/country_cliffstone/CC_Driftwood.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/country_cliffstone/CC_Durango\ Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/country_cliffstone/CC_Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Montana Slate',
//         image: '/temp/stones/country_cliffstone/CC_Montana\ Slate.jpg',
//         show: true,
//       },
//       {
//         name: 'Rundle',
//         image: '/temp/stones/country_cliffstone/CC_Rundle.jpg',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Field Stone',
//     image: '/temp/stones/field_stone/F_Alpine.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alpine',
//         image: '/temp/stones/field_stone/F_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Aspen',
//         image: '/temp/stones/field_stone/F_Aspen.jpg',
//         show: true,
//       },
//       {
//         name: 'Bitteroot',
//         image: '/temp/stones/field_stone/F_Bitteroot.jpg',
//         show: true,
//       },
//       {
//         name: 'Driftwood',
//         image: '/temp/stones/field_stone/F_Driftwood.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/field_stone/F_Durango\ Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/field_stone/F_Granite Ridge.jpg',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Glacier Stone',
//     image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Aspen',
//         image: '/temp/stones/glacier_stone/GlacierStone_Aspen.png',
//         show: true,
//       },
//       {
//         name: 'Biteroot',
//         image: '/temp/stones/glacier_stone/GlacierStone_Biteroot.png',
//         show: true,
//       },
//       {
//         name: 'Northwest',
//         image: '/temp/stones/glacier_stone/GlacierStone_Northwest\ Blend.png',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Mountain Ledge',
//     image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alpine',
//         image: '/temp/stones/mountain_ledge/ML_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Charcoal',
//         image: '/temp/stones/mountain_ledge/ML_Charcoal.jpg',
//         show: true,
//       },
//       {
//         name: 'Cool River',
//         image: '/temp/stones/mountain_ledge/ML_Cool\ River.jpg',
//         show: true,
//       },
//       {
//         name: 'Driftwood',
//         image: '/temp/stones/mountain_ledge/ML_Driftwood.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango',
//         image: '/temp/stones/mountain_ledge/ML_Durango.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/mountain_ledge/ML_Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Montana Slate',
//         image: '/temp/stones/mountain_ledge/ML_Montana\ Slate.jpg',
//         show: true,
//       },
//       {
//         name: 'Rocky Mountain',
//         image: '/temp/stones/mountain_ledge/ML_Rocky\ Mountain.jpg',
//         show: true,
//       },
//       {
//         name: 'Rundle',
//         image: '/temp/stones/mountain_ledge/ML_Rundle.jpg',
//         show: true,
//       },
//       {
//         name: 'Valley',
//         image: '/temp/stones/mountain_ledge/ML_Valley.jpg',
//         show: true,
//       },

//     ],
//   },
//   {
//     name: 'Northen Ledgestone',
//     image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alberta',
//         image: '/temp/stones/northern_ledgestone/NL_Alberta.jpg',
//         show: true,
//       },
//       {
//         name: 'Alpine',
//         image: '/temp/stones/northern_ledgestone/NL_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/northern_ledgestone/NL_Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Bonner',
//         image: '/temp/stones/northern_ledgestone/NL_Bonner.jpg',
//         show: true,
//       },
//       {
//         name: 'Bow Valley',
//         image: '/temp/stones/northern_ledgestone/NL_Bow\ Valley.jpg',
//         show: true,
//       },
//       {
//         name: 'Charcoal',
//         image: '/temp/stones/northern_ledgestone/NL_Charcoal.jpg',
//         show: true,
//       },
//       {
//         name: 'Coal River',
//         image: '/temp/stones/northern_ledgestone/NL_Coal\ River.jpg',
//         show: true,
//       },
//       {
//         name: 'Driftwood',
//         image: '/temp/stones/northern_ledgestone/NL_Driftwood.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/northern_ledgestone/NL_Durango\ Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/northern_ledgestone/NL_Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Harvest Blend',
//         image: '/temp/stones/northern_ledgestone/NL_Harvest\ Blend.jpg',
//         show: true,
//       },
//       {
//         name: 'High Country',
//         image: '/temp/stones/northern_ledgestone/NL_HIgh\ Country.jpg',
//         show: true,
//       },
//       {
//         name: 'Montana Slate',
//         image: '/temp/stones/northern_ledgestone/NL_Montana\ Slate.jpg',
//         show: true,
//       },
//       {
//         name: 'Rocky Mountain',
//         image: '/temp/stones/northern_ledgestone/NL_Rocky\ Mountain.jpg',
//         show: true,
//       },
//       {
//         name: 'Rundle',
//         image: '/temp/stones/northern_ledgestone/NL_Rundle.jpg',
//         show: true,
//       },

//     ],
//   },
//   {
//     name: 'Rustic Ledgestone',
//     image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alpine',
//         image: '/temp/stones/rustic_ledgestone/RL_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Biteroot',
//         image: '/temp/stones/rustic_ledgestone/RL_Biteroot.jpg',
//         show: true,
//       },
//       {
//         name: 'Bonner Country',
//         image: '/temp/stones/rustic_ledgestone/RL_Bonner\ Country.jpg',
//         show: true,
//       },
//       {
//         name: 'Charcoal',
//         image: '/temp/stones/rustic_ledgestone/RL_Charcoal.jpg',
//         show: true,
//       },
//       {
//         name: 'Coal River',
//         image: '/temp/stones/rustic_ledgestone/RL_Coal\ River.jpg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/rustic_ledgestone/RL_Durango\ Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/rustic_ledgestone/RL_Granite Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Harvest Blend',
//         image: '/temp/stones/rustic_ledgestone/RL_Harvest\ Blend.jpg',
//         show: true,
//       },
//       {
//         name: 'Montana Slate',
//         image: '/temp/stones/rustic_ledgestone/RL_Montana\ Slate.jpg',
//         show: true,
//       },

//     ],
//   },
//   {
//     name: 'Shadow Ledgestone',
//     image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alpine',
//         image: '/temp/stones/shadow_ledgestone/SL_Alpine.jpg',
//         show: true,
//       },
//       {
//         name: 'Biteroot',
//         image: '/temp/stones/shadow_ledgestone/SL_Biteroot.jpg',
//         show: true,
//       },
//       {
//         name: 'Bonner Country',
//         image: '/temp/stones/shadow_ledgestone/SL_Bonner\ Country.jpg',
//         show: true,
//       },
//       {
//         name: 'Conifer',
//         image: '/temp/stones/shadow_ledgestone/SL_Conifer.jpeg',
//         show: true,
//       },
//       {
//         name: 'Durango Brown',
//         image: '/temp/stones/shadow_ledgestone/SL_Durango Brown.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/shadow_ledgestone/SL_Granite\ Ridge.jpg',
//         show: true,
//       },
//       {
//         name: 'Montana Slate',
//         image: '/temp/stones/shadow_ledgestone/SL_Montana\ Slate.jpg',
//         show: true,
//       },
//     ],
//   },
//   {
//     name: 'Strip Ledge',
//     image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
//     status: true,
//     isInStock: true,
//     colors: [
//       {
//         name: 'Alabaster',
//         image: '/temp/stones/strip_ledge/SL_Alabaster.jpg',
//         show: true,
//       },
//       {
//         name: 'Bisque',
//         image: '/temp/stones/strip_ledge/SL_Bisque.jpg',
//         show: true,
//       },
//       {
//         name: 'Dark Ocean',
//         image: '/temp/stones/strip_ledge/SL_Dark\ Ocean.jpg',
//         show: true,
//       },
//       {
//         name: 'Granite Ridge',
//         image: '/temp/stones/strip_ledge/SL_Granite\ Ridge.jpg',
//         show: true,
//       },
//     ],
//   },

// ])

const stones = ref([])
const categoryRef = ref(null)

const editStone = (stone: any) => {
  categoryRef.value.openDialog(true, stone)
}

const getProducts = async () => {
  const response = await axios.get('/products/')

  stones.value = response.data
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <section>
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex">
            <h3 class="text-h4 text-primary">
              Stone Category
            </h3>
          </VCol>

          <VCol class="d-flex gap-x-2 justify-end">
            <!-- <VBtn>Show</VBtn> -->
            <!-- <VBtn>Hide</VBtn> -->
            <!-- <VBtn>Delete</VBtn> -->
            <VBtn>
              Add Category
            </VBtn>
          </VCol>
        </VRow>
        <VRow v-if="stones.length > 0">
          <VCol
            v-for="stone in stones"
            :key="stone.name"
            :style="{ 'inline-size': '100%', 'max-inline-size': '30rem', 'opacity': stone.status ? '100%' : '70%', 'min-inline-size': '20rem' }"
          >
            <VCard>
              <VImg
                :src="stone.image"
                height="200"
                cover
              />

              <VCardItem>
                <VCardTitle>{{ stone.name }}</VCardTitle>
                <div
                  v-if="!stone.isInStock"
                  class="text-error"
                >
                  Out of Stock
                </div>
              </VCardItem>

              <VCardText>
                <div class="d-flex">
                  <VBtn @click="editStone(stone)">
                    Edit
                  </VBtn>
                  <VSpacer />
                  <VBtn
                    icon="mdi-trash-can-outline"
                    variant="text"
                  />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
        <VRow v-else>
          <VCol
            v-for="item in 3"
            :key="item"
            :style="{ 'inline-size': '100%', 'max-inline-size': '30rem', 'min-inline-size': '20rem' }"
          >
            <VCard>
              <PuSkeleton height="200px" />
              <VCardItem>
                <PuSkeleton height="25px" />
              </VCardItem>

              <VCardText>
                <div class="d-flex justify-space-between">
                  <PuSkeleton
                    height="40px"
                    width="90px"
                  />
                  <PuSkeleton
                    height="40px"
                    width="50px"
                  />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Category Dialog -->
    <Category ref="categoryRef" />

    <CategoryAddDialog />
  </section>
</template>
