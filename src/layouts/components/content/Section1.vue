<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import SkeletonPreview from '@/layouts/components/content/SkeletonSection.vue'
import axios from '@axios'

const data = ref({
  id: '',
  body: '',
  heading_1: '',
  heading_2: '',
})

const snackbarRef = ref(null)

const loading = ref(false)

const fetchData = async () => {
  const response = await axios.get('/contents/section1/2')

  data.value = response.data
}

const sendData = async () => {
  loading.value = true

  const formData = new FormData()

  formData.append('heading_1', data.value.heading_1)
  formData.append('heading_2', data.value.heading_2)
  formData.append('body', data.value.body)

  try {
    const res = await axios.patch('/contents/section1/2/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (snackbarRef.value && res.status === 200)
      snackbarRef.value.show('success', 'Success')

    fetchData()
    loading.value = false
  }
  catch (error) {
    if (snackbarRef.value)
      snackbarRef.value.show('error', 'Please contact your administrator.')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- Login -->
  <section>
    <VCard>
      <SnackBar ref="snackbarRef" />
      <VCardText
        v-if="data.id"
        class="d-flex flex-column"
      >
        <div class="d-flex justify-space-between">
          <h6 class="text-h6 text-primary mb-3">
            Landing Page (Section 1)
          </h6>
          <VCheckbox label="Show Section" />
        </div>
        <VForm>
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="data.heading_1"
                label="Heading 1"
              />
            </VCol>
            <VCol cols="6">
              <VTextField
                v-model="data.heading_2"
                label="Heading 2"
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="data.body"
                label="Body"
              />
            </VCol>
          </VRow>
        </VForm>

        <div class="d-flex mt-3">
          <VSpacer />
          <VBtn
            :loading="loading"
            color="primary"
            @click="sendData"
          >
            Apply Changes
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="bx-refresh" />
              </span>
            </template>
          </VBtn>
        </div>
      </VCardText>
      <SkeletonPreview v-else />
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
