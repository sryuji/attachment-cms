<template>
  <div class="">
    <h1></h1>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">attachment CMS</h1>
          <p class="mb-5">ホームページに "後から簡単" にCMS機能を設置</p>
          <nuxt-link class="btn btn-primary normal-case" :to="{ name: 'auth-sign-up' }">Get Started</nuxt-link>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-3xl font-bold">いつでも、どのコンテンツでも<br />上書きで変更できる</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-4xl font-bold">後から簡単に<br />始められる</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-3xl font-bold">CMSの用途以外に<br />こんな用途に使える</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-3xl font-bold">Chrome Addon. <br />Coming soon...</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-300">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Let's Try !!</h1>
          <p class="mb-5">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <nuxt-link class="btn btn-primary normal-case" :to="{ name: 'auth-sign-up' }">Sign up</nuxt-link>
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
