<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue';
import axios from '@axios';
import { VDataTable } from 'vuetify/components';

const props = defineProps<{
  type: string,
  id: number,
}>()

const { type } = toRefs(props)
const sampleScene = ref({ variants: {} })
const products = ref([])
const breadcrumbs = ref([])
const tab = ref([])
const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Color', key: 'color', sortable: false },
    { title: 'Image', key: 'image', sortable: false },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
])

const dialog = ref(false)
const deleteDialog = ref(false)
const item = ref({})
const deletedItem = ref(null)
const snackbarRef = ref(null)

const loading = ref(true)

const imageFile = ref()

const fetchData = async () => {
  let productsUrl = null
  if (type.value === 'exterior' || type.value === 'interior') productsUrl = `/products/products/`
  else if (type.value === 'mantel') productsUrl = `/products/colors/`

  const productsResponse = await axios.get(productsUrl)
  products.value = productsResponse.data

  let url = null
  if (type.value === 'exterior') url = `/sample_scenes/sample-exterior/${props.id}`
  else if (type.value === 'interior') url = `/sample_scenes/sample-interior/${props.id}`
  else if (type.value === 'mantel') url = `/sample_scenes/sample-mantle/${props.id}`

  const response = await axios.get(url)

  sampleScene.value = response.data

  tab.value = Object.keys(sampleScene.value.variants)[0]
  
  loading.value = false
}

const showEditDialog = (editedItem) => {
  item.value = editedItem ? JSON.parse(JSON.stringify(editedItem)) : { scene_id: props.id, category: type.value[0].toUpperCase() + type.value.slice(1) }
  if (type.value === 'mantel') item.value.variant_name = 'colors'
  dialog.value = !dialog.value
  imageFile.value = null
  hoverFile.value = null
}

const confirmDeleteItem = (item) => {
  deleteDialog.value = !!item
  deletedItem.value = item
}

const deleteItem = async () => {
  deleteDialog.value = false
  loading.value = true

  try {
    const res = await axios.delete(`/sample_scenes/variant/${deletedItem.value.id}`)

    if (snackbarRef.value && (res.status === 200 || res.status === 204)) {
      const index = sampleScene.value.variants[deletedItem.value.variant_name].map(x => x.id).indexOf(deletedItem.value.id)
      if (index > -1) {
        const sampleSceneCopy = JSON.parse(JSON.stringify(sampleScene.value));
        const items = sampleSceneCopy.variants[deletedItem.value.variant_name]
        items.splice(index, 1)
        sampleScene.value = sampleSceneCopy
      }
      snackbarRef.value.show('success', `Successfully deleted ${type.value} variant #${deletedItem.value.id}.`)
    }

    loading.value = false
  }
  catch (error) {
    if (snackbarRef.value)
      snackbarRef.value.show('error', 'Please contact your administrator.')
  }

  loading.value = false
}

const saveItem = async () => {
  dialog.value = false
  loading.value = true

  const formData = new FormData()
  formData.append('category', item.value.category)
  formData.append('scene_id', item.value.scene_id)
  formData.append('variant_name', item.value.variant_name)
  formData.append('color', item.value.color)

  if (imageFile.value)
    formData.append('image', imageFile.value[0])

  try {
    let method = "post"
    let url = '/sample_scenes/variant/'
    if (item.value.id) {
      method = "patch"
      url += `${item.value.id}/` 
    }

    const res = await axios[method](url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (snackbarRef.value && (res.status === 200 || res.status === 201)) {
      const sampleSceneCopy = JSON.parse(JSON.stringify(sampleScene.value));
      const items = sampleSceneCopy.variants[item.value.variant_name]
      const index = items.map(x => x.id).indexOf(item.value.id)
      if (index > -1) items[index] = res.data
      else items.push(res.data)
      sampleScene.value = sampleSceneCopy
      snackbarRef.value.show('success', `Successfully saved ${type.value} variant #${res.data.id}.`)
    }
  }
  catch (error) {
    if (snackbarRef.value)
      snackbarRef.value.show('error', 'Please contact your administrator.')
  }
  
  loading.value = false
}

onMounted(() => {
  fetchData()
  
  breadcrumbs.value = [{
    title: type.value[0].toUpperCase() + type.value.slice(1),
    href: `/sample-scenes/${type.value}`,
    disabled: false
  }, {
    title: "Variants",
    disabled: true
  }, {
    title: "#" + props.id,
    disabled: true
  }]
})
</script>

<template>
  <section>
    <VCard :loading="loading">
      <SnackBar ref="snackbarRef" />
        <VCardText class="d-flex flex-column">
          <VDialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <div class="d-flex align-end justify-space-between">
                <h6 class="text-h6 text-primary mb-3">
                  <VBreadcrumbs class="pa-0" :items="breadcrumbs"></VBreadcrumbs>
                </h6>
                <VBtn color="primary" dark class="ml-auto ma-3" @click="showEditDialog()" v-bind:disabled="loading">
                    New {{ type[0].toUpperCase() + type.slice(1) }} Variant
                    <VIcon small>mdi-plus-circle-outline</VIcon>
                </VBtn>
              </div>
            </template>
            <VCard>
              <VCardTitle>
                  <span v-if="item.id">Edit {{ type[0].toUpperCase() + type.slice(1) }} Variant #{{item.id}}</span>
                  <span v-else>Create {{ type[0].toUpperCase() + type.slice(1) }} Variant</span>
              </VCardTitle>
              <VCardText>
                  <VRow>
                    <VCol cols="12" v-if="type !== 'mantel'">
                      <VSelect
                        v-model="item.variant_name"
                        label="Select Profile"
                        :items="products.map(x => x.name).sort()"
                      ></VSelect>
                    </VCol>
                    <VCol cols="12" v-if="type !== 'mantel'">
                      <VSelect
                        v-model="item.color"
                        label="Select Color"
                        :items="products.find(x => x.name === item.variant_name)?.colors.map(x => x.name).sort()"
                      ></VSelect>
                    </VCol>
                    <VCol cols="12" v-else>
                      <VSelect
                        v-model="item.color"
                        label="Select Color"
                        :items="products.filter(x => x.product_parent_id === 2000).map(x => x.name).sort()"
                      ></VSelect>
                    </VCol>
                    <VCol cols="612">
                      <VFileInput
                        v-model="imageFile"
                        label="Image"
                        accept="image/*"
                      />
                    </VCol>
                  </VRow>
              </VCardText>
              <VCardActions>
                <VSpacer></VSpacer>
                <VBtn color="default" variant="flat" @click="showEditDialog()">Cancel</VBtn>
                <VBtn variant="flat" @click="saveItem()">Save</VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        </VCardText>
        <VTabs v-model="tab" v-if="type !== 'mantel'">
          <VTab v-for="(variant, index) in Object.keys(sampleScene.variants)" :key="index" :value="variant">{{ variant }}</VTab>
        </VTabs>
        <VCardText class="d-flex flex-column">
          <VDialog v-model="deleteDialog" max-width="500px">
            <VCard>
              <VCardTitle>
                  <span v-if="deletedItem">Delete {{ type[0].toUpperCase() + type.slice(1) }}</span>
              </VCardTitle>
              <VCardText v-if="deletedItem">Are you sure you want to delete {{ type[0].toUpperCase() + type.slice(1) }} Variant #{{deletedItem.id}}?</VCardText>
              <VCardActions>
                <VSpacer></VSpacer>
                <VBtn color="default" variant="flat" @click="confirmDeleteItem()">Cancel</VBtn>
                <VBtn color="error" variant="flat" @click="deleteItem()">Delete</VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
          <template v-if="type === 'mantel'">
            <VDataTable
              :headers="headers" 
              :items="sampleScene.variants['colors']" 
              mobile-breakpoint="800"
              class="elevation-0">
              <template v-slot:item.actions="{ item }">
                  <div class="text-truncate">
                    <VBtn
                      small
                      class="mr-2"
                      @click="showEditDialog(item.props.title)"
                      color="primary" size="small"
                      v-bind:disabled="loading"
                    >
                    <VIcon>mdi-pencil</VIcon>
                    </VBtn>
                    <VBtn
                      small
                      @click="confirmDeleteItem(item.props.title)"
                      color="error" size="small"
                      v-bind:disabled="loading"
                    >
                      <VIcon>mdi-delete</VIcon>
                    </VBtn>
                </div>
              </template>
              <template v-slot:item.id="{ item }">
                  #{{ item.props.title.id }}
              </template>
              <template v-slot:item.color="{ item }">
                  <img v-bind:src="products.find(x => x.name === item.props.title.color)?.image" style="block-size: 100px; inline-size: auto;" />
                  {{ item.props.title.color }}
              </template>
              <template v-slot:item.image="{ item }">
                  <img v-bind:src="item.props.title.image" style="block-size: 100px; inline-size: auto;" />
              </template>
            </VDataTable>
          </template>
          <template v-else>
            <VWindow v-model="tab">
              <VWindowItem v-for="(variant, index) in Object.keys(sampleScene.variants)" :key="index" :value="variant">
                <VDataTable
                  :headers="headers" 
                  :items="sampleScene.variants[variant]" 
                  mobile-breakpoint="800"
                  class="elevation-0">
                  <template v-slot:item.actions="{ item }">
                      <div class="text-truncate">
                        <VBtn
                          small
                          class="mr-2"
                          @click="showEditDialog(item.props.title)"
                          color="primary" size="small"
                          v-bind:disabled="loading"
                        >
                        <VIcon>mdi-pencil</VIcon>
                        </VBtn>
                        <VBtn
                          small
                          @click="confirmDeleteItem(item.props.title)"
                          color="error" size="small"
                          v-bind:disabled="loading"
                        >
                          <VIcon>mdi-delete</VIcon>
                        </VBtn>
                    </div>
                  </template>
                  <template v-slot:item.id="{ item }">
                      #{{ item.props.title.id }}
                  </template>
                  <template v-slot:item.color="{ item }">
                      <img v-bind:src="products.find(x => x.name === item.props.title.variant_name)?.colors?.find(x => x.name === item.props.title.color)?.image" style="block-size: 100px; inline-size: auto;" />
                      {{ item.props.title.color }}
                  </template>
                  <template v-slot:item.image="{ item }">
                      <img v-bind:src="item.props.title.image" style="block-size: 100px; inline-size: auto;" />
                  </template>
                </VDataTable>
              </VWindowItem>
            </VWindow>
          </template>
        </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
.custom-loader{
  display: flex;
  animation: loader 1s infinite;
  color: white;
}

@keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
