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
    <div class="hero min-h-screen text-blue-lightest bg-blue">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-3xl font-bold">いつでも、どのコンテンツでも<br />上書きで変更できる</h1>
          <p class="mb-5">事前に対象コンテンツ単位にCMS機能を設置し、<br />リリースするといった作業は不要です。</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-4xl font-bold">後から簡単に<br />始められる</h1>
          <p class="mb-5">ホームページに指定のコードをコピペするだけ</p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen text-white bg-orange">
      <div class="text-center hero-content w-full">
        <div class="w-full h-1/2">
          <h1 class="mb-5 text-3xl font-bold">こんな場面で便利</h1>
          <div class="my-12 flex justify-between space-x-9 items-stretch">
            <div class="flex-col w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
            <div class="flex-col w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
            <div class="flex-col w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-3xl font-bold">Chrome Extension. <br />Coming soon...</h1>
          <p class="mb-5">
            ブラウザに表示されるホームページに対して、<br />直接、CMSの設定とコンテンツの変更の指示ができる
          </p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen text-white bg-green">
      <div class="text-center hero-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Let's Try !!</h1>
          <p class="mb-5">
            まずは試してみてください。<br />
            手軽に体験できます。
          </p>
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
