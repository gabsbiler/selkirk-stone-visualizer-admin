<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps<{
  type: string
}>()

const { type } = toRefs(props)
const data = ref([])
const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Image', key: 'image', sortable: false },
    { title: 'Hover', key: 'hover', sortable: false },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
])

const dialog = ref(false)
const deleteDialog = ref(false)
const item = ref({})
const deletedItem = ref(null)
const snackbarRef = ref(null)

const loading = ref(true)

const imageFile = ref()
const hoverFile = ref()

const fetchData = async () => {
  let url = null
  if (type.value === 'exterior') url = '/sample_scenes/sample-exterior'
  else if (type.value === 'interior') url = '/sample_scenes/sample-interior'
  else if (type.value === 'mantle') url = '/sample_scenes/sample-mantle'

  const response = await axios.get(url)

  data.value = response.data
  
  loading.value = false
}

const showEditDialog = (editedItem) => {
  item.value = editedItem || {}
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
    let url = null
    if (type.value === 'exterior') url = '/sample_scenes/sample-exterior'
    else if (type.value === 'interior') url = '/sample_scenes/sample-interior'
    else if (type.value === 'mantle') url = '/sample_scenes/sample-mantle'
    const res = await axios.delete(`${url}/${deletedItem.value.id}`)

    if (snackbarRef.value && (res.status === 200 || res.status === 204)) {
      const index = data.value.map(x => x.id).indexOf(deletedItem.value.id)
      if (index > -1) {
        const items = JSON.parse(JSON.stringify(data.value))
        items.splice(index, 1)
        data.value = items
      }
      snackbarRef.value.show('success', `Successfully deleted ${type.value} #${deletedItem.value.id}.`)
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

  if (imageFile.value)
    formData.append('image', imageFile.value[0])

  if (hoverFile.value)
    formData.append('hover', hoverFile.value[0])

  try {
    let method = "post"
    let url = null
    if (type.value === 'exterior') url = '/sample_scenes/sample-exterior/'
    else if (type.value === 'interior') url = '/sample_scenes/sample-interior/'
    else if (type.value === 'mantle') url = '/sample_scenes/sample-mantle/'
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
      const items = JSON.parse(JSON.stringify(data.value))
      const index = items.map(x => x.id).indexOf(item.value.id)
      if (index > -1) items[index] = res.data
      else items.push(res.data)
      data.value = items
      snackbarRef.value.show('success', `Successfully saved ${type.value} #${res.data.id}.`)
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
                {{ type[0].toUpperCase() + type.slice(1) }}
              </h6>
              <VBtn color="primary" dark class="ml-auto ma-3" @click="showEditDialog()" v-bind:disabled="loading">
                  New {{ type[0].toUpperCase() + type.slice(1) }}
                  <VIcon small>mdi-plus-circle-outline</VIcon>
              </VBtn>
            </div>
          </template>
          <VCard>
            <VCardTitle>
                <span v-if="item.id">Edit {{ type[0].toUpperCase() + type.slice(1) }} #{{item.id}}</span>
                <span v-else>Create {{ type[0].toUpperCase() + type.slice(1) }}</span>
            </VCardTitle>
            <VCardText>
                <VRow>
                  <VCol cols="612">
                    <VFileInput
                      v-model="imageFile"
                      label="Image"
                      accept="image/*"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VFileInput
                      v-model="hoverFile"
                      label="Hover"
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
        <VDialog v-model="deleteDialog" max-width="500px">
          <VCard>
            <VCardTitle>
                <span v-if="deletedItem">Delete {{ type[0].toUpperCase() + type.slice(1) }}</span>
            </VCardTitle>
            <VCardText v-if="deletedItem">Are you sure you want to delete {{ type[0].toUpperCase() + type.slice(1) }} #{{deletedItem.id}}?</VCardText>
            <VCardActions>
              <VSpacer></VSpacer>
              <VBtn color="default" variant="flat" @click="confirmDeleteItem()">Cancel</VBtn>
              <VBtn color="error" variant="flat" @click="deleteItem()">Delete</VBtn>
            </VCardActions>
          </VCard>
        </VDialog>
        <VDataTable
            :headers="headers" 
            :items="data" 
            mobile-breakpoint="800"
            class="elevation-0">
          <template v-slot:item.actions="{ item }">
              <div class="text-truncate">
                <VBtn
                  small
                  class="mr-2"
                  :href="'/sample-scenes/' + type + '/' + item.props.title.id"
                  color="secondary" size="small"
                  v-bind:disabled="loading"
                >
                 <VIcon>mdi-view-list</VIcon>
                </VBtn>
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
          <template v-slot:item.image="{ item }">
              <img v-bind:src="item.props.title.image" style="block-size: 100px; inline-size: auto;" />
          </template>
          <template v-slot:item.hover="{ item }">
              <img v-bind:src="item.props.title.hover" style="block-size: 100px; inline-size: auto;" />
          </template>
        </VDataTable>
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
