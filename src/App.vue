<script setup>
import { ref } from 'vue'

const menuMobileAperto = ref(false)

const vociMenu = [
  {nome: 'Home', link: '/'},
  {nome: 'Info D3.js', link: '/approfondimento'},
  {nome: 'Dati & Tech' , link: '/dati'}
]
</script>
<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col">
    
    <nav class="bg-blue-950 text-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
          
          <div class="flex items-center gap-4">
           <img src="./assets/logo-evo.png" alt="Logo Evo Gym" class="w-14 h-14 object-contain border-white shadow-sm">
            <div class="text-2xl font-extrabold tracking-widest uppercase">
              <RouterLink to="/" @click="menuMobileAperto = false" class="focus:outline-none hover:text-rose-500 transition-colors">Evo Gym</RouterLink>
            </div>
          </div>
          
          <ul class="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wide">
            <li v-for="voce in vociMenu" :key="voce.nome">
              <RouterLink :to="voce.link" class="hover:text-slate-300 transition-colors duration-200">
                {{ voce.nome }}
              </RouterLink>
            </li>
            
            <li>
              <RouterLink to="/gestisci" class="px-5 py-2 border border-white rounded hover:bg-white hover:text-blue-950 transition-colors duration-200">
                Area Personale
              </RouterLink>
            </li>
          </ul>

          <div class="md:hidden flex items-center">
            <button @click="menuMobileAperto = !menuMobileAperto" class="text-white hover:text-slate-300 focus:outline-none cursor-pointer p-2">
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!menuMobileAperto" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-show="menuMobileAperto" class="md:hidden bg-blue-900 border-t border-blue-800 px-4 pt-4 pb-6 space-y-3 shadow-xl">
        <RouterLink v-for="voce in vociMenu" :key="voce.nome" :to="voce.link" @click="menuMobileAperto = false" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 uppercase tracking-wide">
          {{ voce.nome }}
        </RouterLink>
        <RouterLink @click="menuMobileAperto = false" to="/gestisci" class="block text-center mt-4 px-3 py-3 border border-white rounded-md text-base font-medium text-white hover:bg-white hover:text-blue-950 uppercase tracking-wide">
          Area Personale
        </RouterLink>
      </div>
    </nav>

    <main class="grow w-full flex flex-col">
          <RouterView />
    </main>

    <footer class="bg-blue-950 text-white py-10 mt-auto border-t border-blue-900">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-blue-200 font-medium tracking-wide uppercase text-sm">&copy; 2026 Evo Gym. Progetto Web.</p>
      </div>
    </footer>
  </div>
</template>