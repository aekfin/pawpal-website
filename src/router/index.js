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
import VueResource from 'vue-resource'
import Cookie from 'js-cookie'

Vue.use(Router)
Vue.use(VueResource)

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
        Vue.http.post('/api/logout/', {}, {headers: {'X-CSRFToken': Cookie.get('csrftoken')}}).then(response => {
          console.log(response)
          window.location.reload()
          next('/login')
        }, response => {
          console.log(response)
        })
      }
    },
    { path: '/doctor',
      name: 'DoctorPage',
      component: DoctorPage,
      children: [
        { path: 'vaccination/:appointment_id/', name: 'VaccinationPage', component: VaccinationPage },
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
