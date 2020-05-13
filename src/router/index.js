import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuizPage from '@/components/QuizPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/quizpage',
      name: 'QuizPage',
      component: QuizPage
    }
  ]
})
