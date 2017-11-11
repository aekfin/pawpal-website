import Vue from 'vue'
import Vuex from 'vuex'
// Make vue aware of Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breeds: [
      'Akita',
      'Alaskan Malamute',
      'Basset Hound',
      'Basset Hound',
      'Beagle',
      'Boston Terrier',
      'Bull Terrier',
      'Cavalier King Charles Spaniel',
      'Chihuahua',
      'Chow Chow',
      'Cocker Spaniel',
      'Collie',
      'Dachshund',
      'Dachshund',
      'Dalmatians',
      'English Bulldog',
      'French Bulldog',
      'French Bulldog',
      'Golden retriever',
      'Jack Russell Terrier',
      'Maltese',
      'Maltese',
      'Mastiff',
      'Papiyong',
      'Pekingese',
      'Pomeranian',
      'Poodle',
      'Pug',
      'Schnauzer',
      'Scottish Terrier',
      'Shar-pei',
      'Shiba Inu',
      'Shih-Tzu',
      'St. Bernard',
      'Welsh Corgi',
      'Yorkshire Terrier',
      'ไทยหลังอาน',
      'บางแก้ว'
    ],
    user: { email: '' },
    errorLogin: null
  },
  getters: {
    IsLogin () {
      if (localStorage.getItem('auth')) {
        return true
      } else {
        return false
      }
    },
    IsSelectHospital () {
      if (localStorage.getItem('hospital')) {
        return true
      } else {
        return false
      }
    },
    GetUser () {
      if (localStorage.getItem('auth')) {
        return JSON.parse(localStorage.getItem('auth'))
      } else {
        return null
      }
    },
    GetHospital () {
      if (localStorage.getItem('hospital')) {
        return JSON.parse(localStorage.getItem('hospital'))
      } else {
        return null
      }
    }
  },
  mutations: {
    SelectHospital (state, hospital) {
      localStorage.setItem('hospital', JSON.stringify(hospital))
    },
    Login (state, auth) {
      localStorage.setItem('auth', JSON.stringify(auth))
    },
    Logout (state) {
      localStorage.removeItem('auth')
      localStorage.removeItem('hospital')
    }
  }
})
