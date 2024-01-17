<script setup lang="ts">
import CategoryColorVariantEditDialog from '@/layouts/components/category/CategoryColorVariantEdit.vue'

const props = defineProps({
  stoneVariant: {
    type: Object,
    required: true,
  },
})

const CategoryVariantEditRef = ref(null)

const editStone = () => {
  CategoryVariantEditRef.value.openDialog(true, props.stoneVariant)
  console.log(props.stoneVariant)
}
</script>

<template>
  <div class="d-flex align-center">
    <!-- <VCheckbox v-model="props.stoneVariant.show" /> -->
    <div class="d-flex align-center gap-x-1">
      <div>
        <VImg
          :width="50"
          :height="30"
          aspect-ratio="16/9"
          cover
          :src="props.stoneVariant.image"
          style="border-radius: 5px;"
        />
      </div>
      {{ props.stoneVariant.name }}
      <VBtn
        icon="mdi-note-edit-outline"
        variant="text"
        size="x-small"
        @click="editStone"
      />
    </div>

    <CategoryColorVariantEditDialog ref="CategoryVariantEditRef" />
  </div>
</template>
