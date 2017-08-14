import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/'
import FinderPage from '@/components/Finder.vue'
import FoundDogPage from '@/components/FoundDog.vue'
import MissingDogPage from '@/components/MissingDog.vue'
import VaccinationPage from '@/components/Vaccination.vue'
import LoginPage from '@/components/Login.vue'
import DoctorPage from '@/components/Doctor.vue'
import AppointmentPage from '@/components/Appointment.vue'
import store from '../vuex/store'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/finder', name: 'FinderPage', component: FinderPage },
    { path: '/found-dog', name: 'FoundPage', component: FoundDogPage },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/logout',
      beforeEnter: (to, from, next) => {
        store.commit('Logout')
        next('/login')
      }
    },
    { path: '/doctor',
      name: 'DoctorPage',
      component: DoctorPage,
      children: [
        { path: 'vaccination', name: 'VaccinationPage', component: VaccinationPage },
        { path: 'appointment', name: 'AppointmentPage', component: AppointmentPage }
      ],
      beforeEnter: (to, from, next) => {
        if (store.getters.IsLogin) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

export default router
