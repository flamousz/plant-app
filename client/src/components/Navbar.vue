<script>

import { useRouter } from 'vue-router';
import SideBar from './SideBar.vue';
import { mapActions } from 'pinia';
import { useUomStore } from '../stores/uom';

export default {
  name: 'Navbar',
  components: {
    SideBar
  },
  data() {
    return {
      isMobileMenuOpen: false
    };
  },
  methods: {
    ...mapActions(useUomStore, ['handleSidebarFlag'])
  }
  ,
  setup() {
    const router = useRouter();
    return { router };
  }
};
</script>

<template>
    <SideBar />
    <nav class="bg-blue-200">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <span :class="{'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }">
                &#9776;
              </span>
              <span :class="{'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen }">
                &#10006;
              </span>
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0" @mouseenter="handleSidebarFlag">
              <img
                class="block lg:hidden h-8 w-auto"
                src="../assets/indo evergreen agro business.png"
                alt="Logo Indo Evergreen"
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="../assets/indo evergreen agro business.png"
                alt="Logo Indo Evergreen"
              />
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link
                  to="/crop"
                  class="px-3 py-2  text-md font-medium text-slate-500 hover:text-slate-700  focus:outline-none focus:text-slate-900  "
                  aria-current="page"
                >
                  PlantSheet
                </router-link>
                <router-link
                  to="/plantschedule"
                  class="px-3 py-2  text-md font-medium text-slate-500 hover:text-slate-700  focus:outline-none focus:text-slate-900  "
                  aria-current="page"
                >
                  PlantSchedule
                </router-link>
                <router-link
                  to="/item"
                  class="px-3 py-2  text-md font-medium text-slate-500 hover:text-slate-700  focus:outline-none focus:text-slate-900  "
                  aria-current="page"
                >
                  Item
                </router-link>
              </div>
            </div>
            <div>
              <div class="flex space-x-4">
                <router-link
                  to="/crop"
                  class="px-3 py-2  text-md font-medium text-slate-500 hover:text-slate-700  focus:outline-none focus:text-slate-900  "
                  aria-current="page"
                >
                  PlantSheet
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}" class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            aria-current="page"
          >
            Home
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  

  

  