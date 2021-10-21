<template>
  <div class="">
    <h1></h1>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Attachment CMS</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">何ができるの？</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">何ができるの？</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">何ができるの？</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <button class="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  meta: { auth: false },
  head() {
    return {}
  },
})
export default class TopPageComponent extends Vue {
  mounted() {}
}
</script>
