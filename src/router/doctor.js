import store from '../vuex/store'

import DoctorPage from '@/components/doctor'
import VaccinationPage from '@/components/doctor/Vaccination.vue'
import AppointmentPage from '@/components/doctor/Appointment.vue'
import SelectHospitalPage from '@/components/doctor/SelectHospital.vue'

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
      if (store.getters.IsSelectHospital) {
        next()
      } else {
        next('/logout')
      }
    } else {
      next('/login')
    }
  }
}

export default route
