<!-- <script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '@/stores/quiz'
import { useRoute, useRouter } from 'vue-router'
import results from '@/data/results.json'

const quizStore = useQuizStore()
const { locale } = useI18n()
const route  = useRoute()
const router = useRouter()

const answers = computed(() => quizStore.answers)

function getResultKey(ans) {
  const dTargets  = [2,3,6,7,8]
  const bcTargets = [3,4,7]
  const aTargets  = [3,4,7,8]

  const dCount  = dTargets.filter(i => ans[i-1] === 'd').length
  const bcCount = bcTargets.filter(i => ['b','c'].includes(ans[i-1])).length
  const aCount  = aTargets.filter(i => ans[i-1] === 'a').length

  if (dCount >= 4) return 'result1'
  if (dCount === 3) return 'result2'
  if (dCount === 2) return 'result3'
  if (bcCount >= 2) return 'result4'
  if (aCount >= 3) return 'result5'
  if (aCount === 2) return 'result6'
  return 'fallback'
}

const computedKey = computed(() => getResultKey(answers.value))

const resultKey = computed(() =>
  typeof route.query.type === 'string'
    ? route.query.type
    : computedKey.value
)

const resultLang = computed(() =>
  typeof route.query.lang === 'string'
    ? route.query.lang
    : locale.value
)

const result = computed(() => {
  const key = resultKey.value
  const lang = resultLang.value
  return (results[key]?.[lang] ?? results[key]?.en) || results.fallback.en
})

async function copyResultLink() {
   const url = window.location.origin + router.resolve({
   name: 'results', 
   query: { type: resultKey.value, lang: resultLang.value } 
   }).href

   await navigator.clipboard.writeText(url)
   alert('Ссылка скопирована!')
}


</script> -->

<script setup>

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '@/stores/quiz'
import { useRoute, useRouter } from 'vue-router'
import results from '@/data/results.json'

const quizStore = useQuizStore()
const { locale } = useI18n()
const route  = useRoute()
const router = useRouter()

const answers = computed(() => quizStore.answers)

function getResultKey(ans) {
  const dTargets  = [2,3,6,7,8]
  const bcTargets = [3,4,7]
  const aTargets  = [3,4,7,8]

  const dCount  = dTargets.filter(i => ans[i-1] === 'd').length
  const bcCount = bcTargets.filter(i => ['b','c'].includes(ans[i-1])).length
  const aCount  = aTargets.filter(i => ans[i-1] === 'a').length

  if (dCount >= 4) return 'result1'
  if (dCount === 3) return 'result2'
  if (dCount === 2) return 'result3'
  if (bcCount >= 2) return 'result4'
  if (aCount >= 3) return 'result5'
  if (aCount === 2) return 'result6'
  return 'fallback'
}

const computedKey = computed(() => getResultKey(answers.value))

const resultKey = computed(() =>
  typeof route.query.type === 'string'
    ? route.query.type
    : computedKey.value
)

const resultLang = computed(() =>
  typeof route.query.lang === 'string'
    ? route.query.lang
    : locale.value
)

const result = computed(() => {
  const key = resultKey.value
  const lang = resultLang.value
  return (results[key]?.[lang] ?? results[key]?.en) || results.fallback.en
})
import { defineProps } from 'vue'

const props = defineProps({
  type: String,
  lang: String,
})

const resultText = computed(() => {
  return `Result for type: ${props.type}, language: ${props.lang}`
})
</script>

<template>
  <main class="result-wrapper">
    <div class="bg-under"></div>
    <div class="bg-pic"></div>

    <div class="result-container">
      <div class="result">
        <h1 class="header-xl" v-html="result"></h1>
      </div>

      <div class="links-wrapper">
        <ul class="links-list">
          <li><a href="#"><img src="/images/google-icon.png" alt="Google icon"></a></li>
          <li><a href="#"><img src="/images/app-icon.png" alt="App icon"></a></li>
          <li><a href="#"><img src="/images/xbet-icon.png" alt="Xbet icon"></a></li>
          <li>
            <button @click="copyResultLink" class="share-btn">
              <img src="/images/share-icon.png" alt="Share icon">
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
   .result-wrapper {
      @include width-height(100%, 100%);
      min-height: 100vh;
      position: relative;
      z-index: 0;
      overflow: hidden;
   }

   .bg-under {
      position: absolute;
      inset: 0;
      background-image: url('/images/bg-layer.webp');
      background-repeat: no-repeat;
      background-size: 100% auto; 
      background-position: bottom center;
      z-index: -1;
   }

   .bg-pic {
      position: absolute;
      inset: 0;
      background-image:  url('/images/bg-layer-2.webp');
      background-repeat: no-repeat;
      background-size: 53% auto; 
      background-position: bottom right; 
      z-index: -2;

      @include mq(small) {
         background-size: 120% auto; 
         background-position: bottom left; 
      }
   }

   .result-container {
      @include width-height(100%, 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-inline: 3.5rem;
      padding-block: 11rem 6.12rem;
      gap: 3rem;

      @include mq(small) {
         flex-direction: column;
         padding-block: 10rem 2.94rem;
         padding-inline: 1rem;
      }
   }

   h1 {
      width: 100%;
      width: 74.6875rem;
      text-align: center;
      padding-inline: 2.13rem;

      @include mq(small) {
         width: 100%;
         font-size: 2.625rem;
         letter-spacing: 0.02625rem;
         padding-inline: 0.94rem;
      }
   }
      

   .links-list {
      @include flexbox(row, start, center, 0);

      @include mq(small) {
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-template-rows: 1fr 1fr;
         row-gap: 0.44rem;
         padding-inline: 1.12rem;

         li:nth-child(1) { order: 3; }
         li:nth-child(2) { order: 4; }
         li:nth-child(3) { order: 1; }
         li:nth-child(4) { order: 2; }
      }

      li {
         a,
         button {
            display: block;
            width: 20.375rem;
            height: 5.75rem;

            @include mq(small) {
               width: 100%;
               height: auto;
            }

            img {
               width: 100%;
               height: 100%;
               object-fit: contain; 
               display: block;
            }
         }

         button {
            background-color: transparent;
            border: none;
         }
      }
   }
</style>

 