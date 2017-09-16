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
    { path: '/found-dog',
      name: 'FoundPage',
      component: FoundDogPage,
      children: [
        { path: 'filter[breed=:breed][color=:color][date=:date]' },
        { path: 'filter[breed=:breed][color=:color]' },
        { path: 'filter[breed=:breed][date=:date]' },
        { path: 'filter[color=:color][date=:date]' },
        { path: 'filter[breed=:breed]' },
        { path: 'filter[color=:color]' },
        { path: 'filter[date=:date]' }
      ]
    },
    { path: '/missing-dog', name: 'MissingPage', component: MissingDogPage }
  ]
}

export default route
