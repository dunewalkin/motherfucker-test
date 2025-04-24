import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultView from '@/views/ResultView.vue'

const routes = [
  { path: '/',      component: WelcomeView },
  { path: '/quiz',  component: QuizView },
  {
   path: '/result',
   name: 'result',
   component: ResultView,
 }
]

export default createRouter({
  history: createWebHistory(),
  routes
})