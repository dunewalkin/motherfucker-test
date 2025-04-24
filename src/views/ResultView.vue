<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuizStore } from '@/stores/quiz'

const quizStore = useQuizStore()
const { locale } = useI18n()

const answers = computed(() => quizStore.answers)
console.log('answers from store:', answers.value)

const results = {
   result1: {
     en: "General of the motherf*ckers army!\nGet your keyboard ready and attack",
     ru: "Генерал армии мамкоёбов!\nПриготовь клавиатуру и в атаку",
   },
   result2: {
     en: "Certified motherf*cker!\nYou are ready to f*ck mom in chat even she is beige",
     ru: "Сертифицированный мамкоёб!\nБез страха. Без сомнений. Без ума от чужих мам.",
   },
   result3: {
     en: "You are a real motherf*ucker!\nDr.Dre has already bought your merch",
     ru: "Ты настоящий ублюдок!Dr.Dre уже купил твой мерч",
   },
   result4: {
     en: "Matchmaking schoolboy\nThe chat is the only place you've ever had sex",
     ru: "Школьник из матчмейкинга\nЧат — это единственное место, где у тебя был секс",
   },
   result5: {
     en: "Поздравляю, бро!\nТы маменькин сынок\nНоси этот титул и подштанники c гордостью",
     ru: "Congratulations, bro!\nYou are mommy's boy\nWear this title and underpants proudly",
   },
   result6: {
     en: "Гигасын\nТы уважаешь матерей даже больше, чем просыпаться в 5 утра\n",
     ru: "GigaSon\nYou respect mothers even more than you respect waking up at 5 a.m.\n",
   },
   fallback: {
     en: "No clear result. You are... unique.",
     ru: "Не удалось определить результат. Ты... уникален.",
   },
 }

const getResult = (answers, locale) => {
  const dTargets = [2, 3, 6, 7, 8]
  const bcTargets = [3, 4, 7]
  const aTargets = [3, 4, 7, 8]

  const dCount = dTargets.filter(q => answers[q - 1] === 'd').length
  const bcCount = bcTargets.filter(q => ['b', 'c'].includes(answers[q - 1])).length
  const aCount = aTargets.filter(q => answers[q - 1] === 'a').length

  if (dCount >= 4) return results.result1[locale] || results.result1.en
  if (dCount === 3) return results.result2[locale] || results.result2.en
  if (dCount === 2) return results.result3[locale] || results.result3.en
  if (bcCount >= 2) return results.result4[locale] || results.result4.en
  if (aCount >= 3) return results.result5[locale] || results.result5.en
  if (aCount === 2) return results.result6[locale] || results.result6.en

  return results.fallback[locale] || results.fallback.en
}

const result = computed(() => getResult(answers.value, locale.value))
</script>

<template>
   <div class="result">
     <h2>{{ result }}</h2>
   </div>
</template>

 