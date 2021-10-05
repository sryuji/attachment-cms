<template>
  <div>
    <div
      class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between"
    >
      <a
        href="#"
        class="
          text-lg
          font-semibold
          tracking-widest
          text-gray-900
          rounded-lg
          focus:outline-none
          focus:shadow-outline
        "
        >Dashboard</a
      >
    </div>
    <div class="py-2 bg-base-200">
      <ul class="menu m-2 p-4 shadow-lg bg-base-100 rounded-box">
        <li class="menu-title">
          <span> Table List </span>
        </li>
        <li>
          <nuxt-link :to="{ name: 'index' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 mr-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            Item with icon
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SideMenu extends Vue {
  mounted() {}
}
</script>
