<template>
  <div class="">
    <h1></h1>
    <div class="hero min-h-screen bg-base-200">
      <div class="text-center hero-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-5xl font-bold">attachment CMS</h1>
          <p class="mb-5 text-xl">ホームページに "後から簡単" にCMS機能を設置</p>
          <nuxt-link class="btn btn-primary normal-case" :to="{ name: 'auth-sign-up' }">Get Started</nuxt-link>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen text-blue-lightest bg-blue">
      <div class="text-center hero-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-4xl font-bold">いつでも、どのコンテンツでも<br />上書きで変更できる</h1>
          <p class="my-5 text-xl">
            コンテンツ単位の事前準備は不要！<br /><br />
            「この項目も管理対象にしておけば良かった...」<br />
            といった事も起きません。
          </p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-green text-green-lightest">
      <div class="text-center hero-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-4xl font-bold">後から簡単に<br />少しずつ始められる</h1>
          <p class="mb-5 text-xl">
            ホームページに指定のコードをコピペするだけ。<br />
            Google Analyticsや広告タグのように設置できます。
          </p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen text-white bg-orange">
      <div class="text-center hero-content w-full">
        <div class="w-full h-1/2">
          <h1 class="mb-5 text-4xl font-bold">こんな場面で便利</h1>
          <div
            class="
              my-12
              text-lg
              flex flex-col
              space-x-0 space-y-6
              sm:space-x-9 sm:space-y-0 sm:flex-row
              justify-between
              items-stretch
            "
          >
            <div class="w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
            <div class="w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
            <div class="w-full">
              <div class="bg-white text-orange rounded-box w-full h-full text-xl p-6">
                <p>xxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen bg-grey-lighter">
      <div class="text-center hero-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-4xl font-bold">Chrome extension <br /></h1>
          <p class="mb-5 text-2xl font-bold">coming soon !!</p>
          <p class="mb-5 text-xl">
            ブラウザに表示されるホームページに対して、<br />直接、設定とコンテンツの変更指示ができます。
          </p>
        </div>
      </div>
    </div>
    <div class="hero min-h-screen text-white bg-green">
      <div class="text-center hero-content">
        <div class="max-w-lg">
          <h1 class="mb-5 text-5xl font-bold">Let's Try !!</h1>
          <p class="mb-5 text-xl">
            まずは試してみてください。<br />
            手軽に体験できます。
          </p>
          <nuxt-link class="my-5 btn btn-primary normal-case" :to="{ name: 'auth-sign-up' }">Sign up</nuxt-link>
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
