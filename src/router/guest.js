import GuestPage from '@/components/guest'
import FinderPage from '@/components/guest/Finder.vue'
import FoundDogPage from '@/components/guest/FoundDog.vue'
import MissingDogPage from '@/components/guest/MissingDog.vue'

var route = {
  path: '/guest',
  name: 'GuestPage',
  component: GuestPage,
  children: [
    { path: '/finder', name: 'FinderPage', component: FinderPage },
    { path: '/found-dog', name: 'FoundPage', component: FoundDogPage },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage }
  ]
}

export default route
