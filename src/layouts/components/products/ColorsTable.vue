<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps<{
  id: number,
}>()

const data = ref([])
const breadcrumbs = ref([])
const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Image', key: 'image', sortable: false },
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Is Available', key: 'is_available', sortable: false },
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
  const response = await axios.get('products/colors/')

  data.value = response.data.filter(x => x.product_parent_id === parseInt(props.id))
  
  loading.value = false
}

const showEditDialog = (editedItem) => {
  item.value = editedItem ? JSON.parse(JSON.stringify(editedItem)) : { product_parent_id: parseInt(props.id), is_available: true }
  dialog.value = !dialog.value
  imageFile.value = null
}

const confirmDeleteItem = (item) => {
  deleteDialog.value = !!item
  deletedItem.value = item
}

const deleteItem = async () => {
  deleteDialog.value = false
  loading.value = true

  try {
    const res = await axios.delete(`/products/colors/${deletedItem.value.id}`)

    if (snackbarRef.value && (res.status === 200 || res.status === 204)) {
      const index = data.value.map(x => x.id).indexOf(deletedItem.value.id)
      if (index > -1) {
        const items = JSON.parse(JSON.stringify(data.value))
        items.splice(index, 1)
        data.value = items
      }
      snackbarRef.value.show('success', `Successfully deleted color #${deletedItem.value.id}.`)
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

  if (imageFile.value) formData.append('image', imageFile.value[0])
  
  formData.append('product_parent_id', item.value.product_parent_id)
  formData.append('name', item.value.name)
  formData.append('is_available', item.value.is_available)

  try {
    let method = "post"
    let url = '/products/colors/'
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
      snackbarRef.value.show('success', `Successfully saved color #${res.data.id}.`)
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
    title: "Stone",
    href: "/products/stone",
    disabled: false
  }, {
    title: "Colors",
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
                <VBreadcrumbs v-if="props.id != '2000'" class="pa-0" :items="breadcrumbs"></VBreadcrumbs>
                <span v-else>Mantel</span>
              </h6>
              <VBtn color="primary" dark class="ml-auto ma-3" @click="showEditDialog()" v-bind:disabled="loading">
                  <span v-if="props.id != '2000'">New Color</span>
                  <span v-else>New Mantel</span>
                  <VIcon small>mdi-plus-circle-outline</VIcon>
              </VBtn>
            </div>
          </template>
          <VCard>
            <VCardTitle>
                <span v-if="props.id != '2000'">
                  <span v-if="item.id">Edit Color #{{item.id}}</span>
                  <span v-else>Create Color</span>
                </span>
                <span v-else>
                  <span v-if="item.id">Edit Mantel #{{item.id}}</span>
                  <span v-else>Create Mantel</span>
                </span>
            </VCardTitle>
            <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VFileInput
                      v-model="imageFile"
                      label="Image"
                      accept="image/*"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="item.name"
                      label="Name"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSelect
                      v-model="item.is_available"
                      label="Is Available?"
                      :items="[{ title: 'Yes', value: true }, { title: 'No', value: false }]"
                    ></VSelect>
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
                <span v-if="deletedItem">
                  <span v-if="props.id != '2000'">Delete Color</span>
                  <span v-else>Delete Mantel</span>
                </span>
            </VCardTitle>
            <VCardText v-if="deletedItem">
                <span v-if="props.id != '2000'">Are you sure you want to delete Color #{{deletedItem.id}}?</span>
                <span v-else>Are you sure you want to delete Mantel #{{deletedItem.id}}?</span>
            </VCardText>
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
          <template v-slot:item.is_available="{ item }">
              {{ item.props.title.is_available ? "Yes" : "No" }}
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
