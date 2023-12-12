<script setup lang="ts">
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { emailValidator, passwordValidator, requiredValidator } from '@validators'

const route = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const invalidCredentialsError = ref(false)

const submitForm = () => {
  if (form.value.email === 'admin@admin.com' && form.value.password === '@Dm1n@Dm1n') {
    localStorage.setItem('loggedIn', '1')
    route.push('/')
  }
  else {
    invalidCredentialsError.value = true
    console.log(form.value.email + form.value.password)
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
            Welcome
          </h6>
          <p class="mb-0">
            Sign in your account
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="submitForm">
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
                  :rules="[requiredValidator, passwordValidator]"
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
                  <VBtn type="submit">
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
    <VSnackbar
      v-model="invalidCredentialsError"
      location="top end"
      variant="flat"
      color="error"
    >
      Invalid Credentials
    </VSnackbar>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
