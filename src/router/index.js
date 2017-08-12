import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/'
import FinderPage from '@/components/Finder.vue'
import FoundDogPage from '@/components/FoundDog.vue'
import MissingDogPage from '@/components/MissingDog.vue'
import VaccinationPage from '@/components/Vaccination.vue'
import LoginPage from '@/components/Login.vue'
import DoctorPage from '@/components/Doctor.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/finder', name: 'FinderPage', component: FinderPage },
    { path: '/found-dog', name: 'FoundPage', component: FoundDogPage },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage },
    { path: '/doctor',
      name: 'DoctorPage',
      component: DoctorPage,
      children: [
        { path: 'vaccination', name: 'VaccinationPage', component: VaccinationPage }
      ],
      beforeEnter: (to, from, next) => {
        next('/login')
      }
    }
  ]
})

export default router
