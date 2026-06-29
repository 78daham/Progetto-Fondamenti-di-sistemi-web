<script setup>
import imgForce from '../assets/force-layout.png'
import imgGerarchie from '../assets/gerarchie.jpg'
import imgProiezioni from '../assets/proiezioni.gif'

const puntiD3 = [
  { titolo: "Manipola il DOM", testo: "Associa i tuoi dati agli elementi della pagina web e li modifica dinamicamente." },
  { titolo: "Standard Web", testo: "Sfrutta tecnologie native come HTML5, CSS e SVG." },
  { titolo: "Trasparenza", testo: "Non nasconde il markup; il grafico è parte integrante della pagina web, ispezionabile e accessibile." }
]

const argomentiIndice = [
  {titolo: "1. Selezioni e Data Binding", testo: "Le fondamenta per selezionare elementi DOM e agganciarli ai dati."},
  { titolo: "2. Scale Matematiche e Assi", testo: "La traduzione dei dati astratti in coordinate pixel." },
  { titolo: "3. SVG e Generatori di Forme", testo: "Utilizzo di linee, path e delle funzioni matematiche per tracciarli." },
  { titolo: "4. Interattività e Transizioni", testo: "Come gestire eventi mouse e animare le forme." },
  { titolo: "5. Layout Complessi e Mappe", testo: "Utilizzo di motori geometrici (Force, Stack) e mappe GeoJSON." }
]

const motiviD3 = [
  {
    icona: "🎨",
    titolo: "Flessibilità Totale",
    descrizione: "Hai il controllo visivo al singolo pixel tramite SVG. Nessun limite imposto da template rigidi."
  },
  {
    icona: "🌐",
    titolo: "Aderenza agli Standard",
    descrizione: "Sfruttando tecnologie native, le visualizzazioni sono perfette e leggibili per il web moderno."
  },
  {
    icona: "⚡",
    titolo: "Animazioni Fluide",
    descrizione: "Motore interno per transizioni fluide che aiutano l'utente a seguire l'evoluzione dei dati."
  }
]

const esempiAvanzati = [
  { 
    immagine: imgForce, 
    titolo: "Reti e Nodi", 
    descrizione: "Simulano gravità e repulsione per relazioni complesse." 
  },
  { 
    immagine: imgGerarchie, 
    titolo: "Gerarchie", 
    descrizione: "Ideali per visualizzare dati annidati o organigrammi." 
  },
  { 
    immagine: imgProiezioni, 
    titolo: "Cartografia", 
    descrizione: "Proietta dati GeoJSON su mappe interattive." 
  }
]
</script>


<template>
  <div class="max-w-5xl mx-auto space-y-20 pb-20 pt-10 px-4">
    
    <section class="text-center">
      <h1 class="text-5xl font-extrabold text-slate-900 mb-6">
        Introduzione a <span class="text-rose-600">D3.js</span>
      </h1>
      <p class="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
        D3.js non è una classica libreria di "grafici pronti all'uso", ma un potente ecosistema a basso livello per costruire strumenti visuali su misura.
      </p>

      <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left max-w-3xl mx-auto">
        <ul class="space-y-4 text-slate-700">
          <li v-for="punto in puntiD3" :key="punto.titolo">
             <strong class="text-rose-600">{{ punto.titolo }}:</strong> {{ punto.testo }}
          </li>
        </ul>
      </div>
      
      <img src="../assets/D3.png" alt="Logo D3" class="w-full max-w-2xl mx-auto rounded-xl border border-slate-200 mt-10">
    </section>

    <section>
      <h2 class="text-3xl font-bold text-slate-800 mb-8 text-center">Perché usare D3.js?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="motivo in motiviD3" :key="motivo.titolo" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
          <div class="text-4xl mb-4">{{ motivo.icona }}</div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">{{ motivo.titolo}}</h3>
          <p class="text-slate-600 text-sm">{{ motivo.descrizione }}</p>
        </div>
      </div>
    </section>

    <section class="bg-slate-50 p-8 rounded-3xl border border-slate-200">
      <h2 class="text-3xl font-bold text-slate-800 mb-6 text-center">Il Paradigma Centrale: Data Binding</h2>
      <p class="text-slate-600 mb-8 text-center max-w-2xl mx-auto">
        Il cuore di D3 è l'associazione tra dati ed elementi visivi. Questo ciclo gestisce i dati in tempo reale con tre stati:
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
          <strong class="block text-green-600 mb-1">Enter</strong> Nuovi dati in arrivo, crea nuova forma.
        </div>
        <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <strong class="block text-blue-600 mb-1">Update</strong> Dati esistenti il cui valore cambia.
        </div>
        <div class="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
          <strong class="block text-red-600 mb-1">Exit</strong> Elementi vecchi da rimuovere.
        </div>
      </div>
      <img src="../assets/data binding.png" alt="Schema Enter Update Exit" class="w-full max-w-2xl mx-auto rounded-xl shadow-sm border border-slate-200">
    </section>

    <section>
      <h2 class="text-3xl font-bold text-slate-800 mb-8 text-center">Oltre i Grafici Standard</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="esempio in esempiAvanzati" :key="esempio.titolo" class="text-center">
          <img :src="esempio.immagine" :alt="esempio.titolo" class="w-full h-48 object-cover rounded-xl shadow-sm border border-slate-200 mb-4">
          <h3 class="font-bold text-slate-800 mb-2">{{ esempio.titolo }}</h3>
          <p class="text-sm text-slate-600">{{ esempio.descrizione }}</p>
        </div>
      </div>
    </section>
    
    <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-slate-800 mb-6">Indice degli approfondimenti</h2>
      <ul class="space-y-4">
        <li v-for="argomento in argomentiIndice" :key="argomento.titolo" class="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition cursor-pointer">
          <span class="text-xl">🔗</span>
          <p class="text-slate-700">
            <strong>{{ argomento.titolo }}</strong> - {{ argomento.testo }}
          </p>
        </li>
      </ul>
    </section>

  </div>
</template>