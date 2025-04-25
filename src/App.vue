<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLocale() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
}
</script>

<template>
  <header class="header">
    <div class="lang-buttons-wrapper">
      <div class="lang-buttons-desktop">
        <button 
          :class="{ active: locale === 'ru' }"
          @click="locale = 'ru'"
        >ru</button>
        <button 
          :class="{ active: locale === 'en' }"
          @click="locale = 'en'"
        >en</button>
      </div>

      <div class="lang-button-mobile">
        <button @click="toggleLocale()">
          {{ locale.toUpperCase() }}
        </button>
      </div>
    </div>

    <div class="logo-wrapper">
      <a href="#"><img src="/icons/bet-logo.svg" alt="Bet logo"></a>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss" scoped>
.lang-buttons-wrapper {
   @include position(absolute, 3.13rem, 50%, auto, auto);
   transform: translate(50%);
   @include flexbox(row, center, center, 0.62rem);
   z-index: 5;

   .lang-buttons-desktop { display: flex; gap: 0.62rem; }
   .lang-button-mobile  { display: none; }

   @include mq(small) {
      .lang-buttons-desktop { display: none; }
      .lang-button-mobile  { display: block; }

      @include position(absolute, 2.5rem, 1.25rem, auto, auto);
      transform: none;
   }

   button {
      padding: 0.62rem 0.94rem 0.40rem;
      border-radius: 0.4375rem;
      border: none;
      font-family: "HelveticaNeueCyr";
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 120%;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(7.5px);
      color: var(--white-100);
      transition: all 0.3s ease;
      cursor: pointer;

      @include mq(small) {
         font-size: 1rem;
         background-color: var(--white-100);
         color: var(--blue-100);
      }

      &.active {
         background-color: var(--white-100);
         color: var(--blue-100);
      }
   }
}

.logo-wrapper {
   @include position(absolute, 3.13rem, auto, auto, 2.12rem);
   @include width-height(auto, 5.75856rem);

   @include mq(small) {
      @include position(absolute, 2.5rem, auto, auto, 1.25rem);
      @include width-height(auto, 3.125rem);
   }

   img, a {
      @include width-height(100%, 100%);
   }
}
</style>

