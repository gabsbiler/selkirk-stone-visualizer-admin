<script setup lang="ts">
import Footer from '@/layouts/components/content/Footer.vue'
import Login from '@/layouts/components/content/Login.vue'
import Section1 from '@/layouts/components/content/Section1.vue'
import Section2 from '@/layouts/components/content/Section2.vue'
import Section3 from '@/layouts/components/content/Section3.vue'
import Section4 from '@/layouts/components/content/Section4.vue'
import Signup from '@/layouts/components/content/Signup.vue'
</script>

<template>
  <div class="d-flex gap-y-5 flex-column">
    <Login />
    <Signup />
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <Footer />
  </div>
</template>
