import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/'
import FinderPage from '@/components/Finder.vue'
import FoundDogPage from '@/components/FoundDog.vue'
import MissingDogPage from '@/components/MissingDog.vue'
import VaccinationPage from '@/components/Vaccination.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'landingPage', component: LandingPage },
    { path: '/finder', name: 'finderPage', component: FinderPage },
    { path: '/found-dog', name: 'foundPage', component: FoundDogPage },
    { path: '/missing-dog', name: 'missingPage', component: MissingDogPage },
    { path: '/doctor/vaccination', name: 'vaccinationPage', component: VaccinationPage }
  ]
})
