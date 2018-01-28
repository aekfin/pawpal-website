const GuestPage = () => import('@/components/guest')
const FinderPage = () => import('@/components/guest/Finder.vue')
const FoundDogPage = () => import('@/components/guest/FoundDog.vue')
const MissingDogPage = () => import('@/components/guest/MissingDog.vue')
const AdoptableDogPage = () => import('@/components/guest/AdoptableDog.vue')

var route = {
  path: '/guest',
  name: 'GuestPage',
  component: GuestPage,
  children: [
    { path: '/finder', name: 'FinderPage', meta: {title: 'ระบบเพิ่มสุนัขที่หาย- Pawpal'}, component: FinderPage },
    { path: '/found-dog', name: 'FoundPage', component: FoundDogPage },
    { path: '/adoptable-dog', name: 'AdoptableDogPage', component: AdoptableDogPage },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage }
  ]
}

export default route
