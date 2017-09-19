import store from '../vuex/store'

const DoctorPage = () => import('@/components/doctor')
const VaccinationPage = () => import('@/components/doctor/Vaccination.vue')
const VaccinationRecordPage = () => import('@/components/doctor/VaccinationRecord.vue')
const AppointmentPage = () => import('@/components/doctor/Appointment.vue')
const SelectHospitalPage = () => import('@/components/doctor/SelectHospital.vue')
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
    { path: 'vaccination/:appointment_id/', name: 'VaccinationPage', component: VaccinationPage },
    { path: 'record/:dog_id/', name: 'VaccinationRecordPage', component: VaccinationRecordPage }
  ],
  beforeEnter: (to, from, next) => {
    if (store.getters.IsLogin) {
      Vue.http.get('/api/session/').then(response => {
        // console.log(response)
        if (response.body.success && store.getters.IsSelectHospital) {
          next()
        } else {
          next('/logout')
        }
      }, error => {
        if (error.body.success) {
          next()
        } else {
          next('/logout')
        }
      })
    } else {
      next('/login')
    }
  }
}

export default route
