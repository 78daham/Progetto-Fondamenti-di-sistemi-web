<script setup>
import { ref, onMounted } from 'vue'

const sessioni = ref([])
const eserciziDisponibili = ['Squat', 'Bench', 'Deadlift', 'Push up', 'Trazioni', 'Leg extension']

const form = ref({ esercizio: '', peso: '', ripetizioni: '', serie: '', data: '' })
const modificaId = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('sessioni-gym')
  if (saved) sessioni.value = JSON.parse(saved)
})

function salva() {
  localStorage.setItem('sessioni-gym', JSON.stringify(sessioni.value))
}

function aggiungi() {
  if (!form.value.esercizio || !form.value.peso || !form.value.data) return
  
  const datiSessione = {
    esercizio: form.value.esercizio,
    peso: Number(form.value.peso),
    ripetizioni: Number(form.value.ripetizioni),
    serie: Number(form.value.serie),
    data: form.value.data
  }

  if (modificaId.value !== null) {
    datiSessione.id = modificaId.value
    const index = sessioni.value.findIndex(s => s.id === modificaId.value)
    sessioni.value[index] = datiSessione
    modificaId.value = null
  } else {
    datiSessione.id = Date.now()
    sessioni.value.push(datiSessione)
  }
  
  form.value = { esercizio: '', peso: '', ripetizioni: '', serie: '', data: '' }
  salva()
}

function modifica(sessione) {
  form.value = {
    esercizio: sessione.esercizio,
    peso: sessione.peso,
    ripetizioni: sessione.ripetizioni,
    serie: sessione.serie,
    data: sessione.data
  }
  modificaId.value = sessione.id
}

function elimina(id) {
  sessioni.value = sessioni.value.filter(s => s.id !== id)
  salva()
}

function annulla() {
  modificaId.value = null
  form.value = { esercizio: '', peso: '', ripetizioni: '', serie: '', data: '' }
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h1 class="text-4xl font-bold text-slate-900 mb-2"> Area <span class="text-rose-600">Personale</span></h1>
    <p class="text-slate-500 mb-8">Registra e tieni traccia dei tuoi allenamenti</p>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-10">
      <h2 class="text-xl font-semibold text-slate-800 mb-6">
        <span v-if="modificaId !== null">✏️ Modifica sessione</span>
        <span v-else>➕ Nuova sessione</span>
      </h2>
      
      <div class="flex flex-col gap-4">
        <select v-model="form.esercizio" aria-label="Seleziona esercizio" class="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400">
          <option value="" disabled selected>Scegli un esercizio</option>
          <option v-for="ex in eserciziDisponibili" :key="ex" :value="ex">{{ ex }}</option>
        </select>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input v-model="form.peso" type="number" min="0" placeholder="Peso (kg)" class="border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400" />

          <input v-model="form.ripetizioni" type="number" min="0" placeholder="Ripetizioni" class="border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400" />

          <input v-model="form.serie" type="number" min="0" placeholder="Serie" class="border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400" />
          
          <input v-model="form.data" type="date" aria-label="Data sessione" class="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400" />
        </div>
      </div>
      
      <div class="flex gap-3 mt-6">
        <button @click="aggiungi" aria-label="Salva sessione" class="w-full md:w-auto bg-rose-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-rose-700 transition-colors">
          <span v-if="modificaId !== null">Salva modifiche</span>
          <span v-else>Aggiungi</span>
        </button>
        
        <button v-if="modificaId !== null" @click="annulla" class="w-full md:w-auto text-slate-500 font-medium py-3 px-6 hover:text-slate-800 transition-colors">
          Annulla
        </button>
      </div>
    </div>

    <div v-if="sessioni.length === 0" class="text-slate-400 text-center py-16 bg-white rounded-2xl border border-slate-100">
      Nessuna sessione registrata ancora. Inizia ad aggiungere i tuoi allenamenti!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="s in sessioni" :key="s.id" class="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-slate-800">{{ s.esercizio }}</h3>
            <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span class="text-sm font-medium text-slate-600">⚖️ {{ s.peso }} kg</span>
              <span class="text-sm font-medium text-slate-600">📋 {{ s.serie }} serie</span>
              <span class="text-sm font-medium text-slate-600">🔁 {{ s.ripetizioni }} rip.</span>
            </div>
            <p class="text-sm text-slate-400 mt-2">📅 {{ s.data }}</p>
          </div>
        </div>
        
        <div class="flex gap-2 border-t border-slate-50 pt-4 mt-2">
          <button @click="modifica(s)" aria-label="Modifica sessione" class="flex-1 text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2 rounded-lg transition-colors">
            Modifica
          </button>
          <button @click="elimina(s.id)" aria-label="Elimina sessione" class="flex-1 text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium py-2 rounded-lg transition-colors">
            Elimina
          </button>
        </div>
      </div>
    </div>

  </div>
</template>