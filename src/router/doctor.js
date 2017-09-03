import store from '../vuex/store'

import DoctorPage from '@/components/doctor'
import VaccinationPage from '@/components/doctor/Vaccination.vue'
import AppointmentPage from '@/components/doctor/Appointment.vue'
import SelectHospitalPage from '@/components/doctor/SelectHospital.vue'
import Vue from 'vue'
import VueResource from 'vue-resource'
import Cookie from 'js-cookie'

Vue.use(VueResource)
Vue.http.headers.common['X-CSRFToken'] = Cookie.get('csrftoken')

var route = {
  path: '/doctor',
  component: DoctorPage,
  children: [
    { path: '/', name: 'SelectHospitalPage', component: SelectHospitalPage },
    { path: 'vaccination/', name: 'AppointmentPage', component: AppointmentPage },
    { path: 'vaccination/:appointment_id/', name: 'VaccinationPage', component: VaccinationPage }
  ],
  beforeEnter: (to, from, next) => {
    if (store.getters.IsLogin) {
      Vue.http.get('/api/session/').then(response => {
        // console.log(response)
        if (response.body[0] === 'Have Session' && store.getters.IsSelectHospital) {
          next()
        } else {
          next('/logout')
        }
      }, error => {
        console.log(error)
      })
    } else {
      next('/login')
    }
  }
}

export default route
