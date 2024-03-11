<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import axiosIns from '@/plugins/axios'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { emailValidator, requiredValidator } from '@validators'

const route = useRoute()
const router = useRouter()
const SnackBarRef = ref(null)
const isLoading = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const invalidCredentialsError = ref(false)

const login = async () => {
  isLoading.value = true
  try {
    const response = await axiosIns.post('/users/login/', {
      email: form.value.email,
      password: form.value.password,
    }, {
      withCredentials: true, // Include this line
    })

    sessionStorage.setItem('authToken', response.data.jwt)
    sessionStorage.setItem('first_name', response.data.first_name)
    sessionStorage.setItem('last_name', response.data.last_name)
    sessionStorage.setItem('address', response.data.address)
    sessionStorage.setItem('contact_number', response.data.contact_number)
    sessionStorage.setItem('email', response.data.email)
    sessionStorage.setItem('id', response.data.id)
    localStorage.setItem('loggedIn', '1')

    isLoading.value = false
    console.log(response.data)

    // route.push('/')
    router.replace(route.query.to ? String(route.query.to) : '/')
  }
  catch (error) {
    console.error('Login error:', error)
    isLoading.value = false
    invalidCredentialsError.value = true
    SnackBarRef.value.show('error', 'Please check your credentials')
  }
}

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative">
      <VCard
        class="auth-card px-2"
        max-width="450"
        min-width="450"
      >
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>
        </VCardItem>

        <VCardText class="text-center ">
          <h6 class="text-h4 text-primary mb-1">
            Welcome, Admin!
          </h6>
          <p class="mb-0">
            Sign in your account
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap mt-2 mb-4">
                  <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  />
                </div>

                <div class="d-flex">
                  <VSpacer />
                  <VBtn
                    type="login"
                    variant="outlined"
                    :loading="isLoading"
                  >
                    Login
                  </VBtn>
                </div>

                <!-- login button -->
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
    <SnackBar ref="SnackBarRef" />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
