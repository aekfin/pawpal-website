const GuestPage = () => import('@/components/guest')
const FinderPage = () => import('@/components/guest/Finder.vue')
const FoundDogPage = () => import('@/components/guest/FoundDog.vue')
const MissingDogPage = () => import('@/components/guest/MissingDog.vue')
const AdoptedDogPage = () => import('@/components/guest/AdoptedDog.vue')
const DashboardPage = () => import('@/components/guest/Dashboard.vue')

var route = {
  path: '/guest',
  name: 'GuestPage',
  component: GuestPage,
  children: [
    { path: '/finder', name: 'FinderPage', component: FinderPage },
    { path: '/found-dog', name: 'FoundPage', component: FoundDogPage },
    { path: '/adopted-dog', name: 'AdoptedDogPage', component: AdoptedDogPage },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage },
    { path: '/dashboard', name: 'DashboardPage', component: DashboardPage }
  ]
}

export default route
