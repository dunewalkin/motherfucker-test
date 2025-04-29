<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '@/stores/quiz'
import { useRoute, useRouter } from 'vue-router'
import results from '@/data/results.json'

const quizStore = useQuizStore()
const { locale } = useI18n()
const route  = useRoute()
const router = useRouter()

const linkCopied = ref(false) 

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
  const url = window.location.origin +
    router.resolve({
      name: route.name,
      query: { type: resultKey.value, lang: resultLang.value }
    }).href

  try {
    await navigator.clipboard.writeText(url)
    linkCopied.value = true 

    setTimeout(() => {
      linkCopied.value = false
    }, 5000)
  } catch {
    alert('Не удалось скопировать ссылку')
  }
}
</script>


<template>
  <main class="result-wrapper">
    <div class="bg-under"></div>
    <div class="bg-pic"></div>

    <div v-if="linkCopied" class="message-wrapper">
      <div class="message-container">
         <span v-html="$t('message.copied')"></span>
         <svg class="pseudo-part" xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
            <path d="M16.9865 20.1846C11.7865 20.9846 6.65313 18.1212 4.98646 16.2879C6.70433 12.1914 -3.90146 2.24186 3.09854 2.24148C4.71715 2.24148 6.09961 -1.9986 11.9865 1.1846C12.0077 2.47144 11.9865 6.92582 11.9865 7.6842C11.9865 18.1842 17.9865 19.5813 16.9865 20.1846Z" fill="#448AF7"/>
         </svg>     
      </div>
      <span v-html="$t('message.read')"></span>
   </div>
 

    <div class="result-container">
      <div class="result">
        <h1 class="header-l" v-html="result"></h1>
      </div>

     

      <div class="links-wrapper">
        <ul class="links-list">

         <li>
            <a href="#">
               <div class="link-item-wrapper black">
                  <img src="/icons/google.svg" alt="Google">
               </div>
            </a>
         </li>

         <li>
            <a href="#">
               <div class="link-item-wrapper">
                  <img src="/icons/apple.svg" alt="Apple">
               </div>
            </a>
         </li>

         <li>
            <a href="#">
               <div class="link-item-wrapper">
                  <img src="/icons/1bet.svg" alt="1bet">
               </div>
            </a>
         </li>

         <li>
            <button @click="copyResultLink">
               <div class="link-item-wrapper">
                  <img
                     class="link-logo"
                     :src="linkCopied ? '/icons/copied.svg' : '/icons/share.svg'"
                     :alt="linkCopied ? 'Copy icon' : 'Share icon'"
                  />
               </div>
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
      padding-inline: 2.12rem;
      padding-block: 11rem 6.12rem;
      gap: 3rem;

      @include mq(small) {
         flex-direction: column;
         padding-block: 7.5rem 2.94rem;
         padding-inline: 1rem;
         min-height: 100vh;
      }
   }

   h1 {
      width: 100%;
      max-width: 60%;
      text-align: center;

      @include mq(small) {
         width: 100%;
         font-size: 2rem;
         letter-spacing: 0.02625rem;
         padding-inline: 0.94rem;
         max-width: 100%;
      }
   }

   ::v-deep(.accent) {

      @include mq(small) {
         font-size: 2rem;
         letter-spacing: 0.02625rem;
      }
   }
      

   .links-list {
      @include flexbox(row, start, center, 0);

      @include mq(small) {
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-template-rows: 1fr 1fr;
         row-gap: 0.44rem;

         li:nth-child(1) { order: 3; }
         li:nth-child(2) { order: 4; }
         li:nth-child(3) { order: 1; }
         li:nth-child(4) { order: 2; }
      }

      button {
         width: 100%;
         height: auto;
         background: transparent;
         border: none;
         display: flex;
      }
   }

   .link-item-wrapper {
      width: 20.375rem;
      height: 5.75rem;

      @include mq(small) {
         width: 100%;
         height: 3.125rem;
      }
   }

  


   .message-wrapper {
      position: absolute;
      top: 50%;
      right: 36%;
      width: 18.62rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @include mq(small) {
         width: 9.06rem;
         top: auto;
         right: 61%;
         bottom: 13rem;
      }

      span {
         font-family: Inter;
         font-size: 0.6875rem;
         font-style: normal;
         font-weight: 400;
         line-height: 0.8125rem; /* 118.182% */
         letter-spacing: 0.00413rem;
         color: rgba(255, 255, 255, 0.60);
         text-align: right;

         @include mq(small) {
            font-size: 0.625rem;
         }
      }
   }

   .message-container {
      position: relative;
      padding: 0.375rem 0.75rem 0.625rem 0.875rem;
      border-radius: 1.125rem;
      background: var(--blue-300);
      @include width-height(100%, 3.75rem);

      @include mq(small) {
         padding: 0.4rem 0.75rem;
         @include width-height(100%, 3.82rem);
      }

      span {
         font-family: Inter;
         font-size: 1rem;
         font-style: normal;
         font-weight: 400;
         line-height: 1.375rem; /* 137.5% */
         letter-spacing: -0.0255rem;
         color: var(--white-100);
         display: inline-block;
         text-align: left;

         @include mq(small) {
            font-size: 0.75rem;
            line-height: 135%; /* 1.0125rem */
            letter-spacing: -0.0255rem;
         }
      }

      .pseudo-part {
         @include position(absolute, auto, -0.4rem, -0.08rem, auto);
         fill: var(--blue-300);

         @include mq(small) {
            @include position(absolute, auto, -0.37rem, -0.03rem, auto);
         }
      }
   }

   
</style>

 