import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultView from '@/views/ResultView.vue'
import ResultPage from '@/pages/ResultPage.vue'

const routes = [
   { path: '/', component: WelcomeView },
   { path: '/quiz', component: QuizView },
   {
      path: '/result', 
      name: 'result',
      component: ResultView,
   },
   {
      path: '/results', 
      name: 'results', 
      component: ResultPage,
      props: route => ({
         type: route.query.type, 
         lang: route.query.lang,
      })
   }
]

export default createRouter({
   history: createWebHistory(),
   routes
})
