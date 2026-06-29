<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as d3 from 'd3'

const dati = ref([])
const esercizi = ref([])

const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

function getColore(nomeEsercizio) {
  return colorScale(nomeEsercizio)
}

onMounted(async () => {
  let saved = localStorage.getItem('sessioni-gym')
  let progressioni = saved ? JSON.parse(saved) : []

  if (progressioni.length === 0) {
    dati.value = []
    return
  }

  progressioni.sort((a, b) => new Date(a.data) - new Date(b.data))
  dati.value = progressioni
  esercizi.value = [...new Set(progressioni.map(d => d.esercizio))]

  await nextTick()

  const container = document.getElementById('grafico')
  if (!container) return

  d3.select('#grafico').selectAll('*').remove()

  const isMobile = window.innerWidth < 768

  const margin = { 
    top: 30, 
    right: isMobile ? 20 : 120, 
    bottom: isMobile ? 80 : 40, 
    left: isMobile ? 40 : 60 
  }
  
  const width = (container.clientWidth || 800) - margin.left - margin.right
  const height = 350 - margin.top - margin.bottom

  const svg = d3.select('#grafico')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const dateUnivoche = [...new Set(progressioni.map(d => d.data))].sort((a, b) => new Date(a) - new Date(b))

  const x = d3.scalePoint()
    .domain(dateUnivoche)
    .range([0, width])
    .padding(0.4)

  const maxPeso = d3.max(progressioni, d => Number(d.peso))

  const y = d3.scaleLinear()
    .domain([0, maxPeso + 10]) 
    .range([height, 0])

  // Disegno dell'asse X
  const xAxis = svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d => {
      const dateObj = new Date(d)
      return dateObj.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })
    }))

  if (isMobile) {
    xAxis.selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  }

  svg.append('g')
    .call(d3.axisLeft(y).tickFormat(d => d + ' kg'))

  const line = d3.line()
    .x(d => x(d.data))
    .y(d => y(d.peso))
    .curve(d3.curveMonotoneX)

  esercizi.value.forEach(es => {
    const datiFiltrati = progressioni.filter(d => d.esercizio === es)
    const colore = getColore(es)

    if (datiFiltrati.length === 0) return

    svg.append('path')
      .datum(datiFiltrati)
      .attr('fill', 'none')
      .attr('stroke', colore)
      .attr('stroke-width', 2.5)
      .attr('d', line)

    svg.selectAll(`.dot-${es.replace(/\s+/g, '-')}`)
      .data(datiFiltrati)
      .join('circle')
      .attr('cx', d => x(d.data))
      .attr('cy', d => y(d.peso))
      .attr('r', 4)
      .style('fill', colore)
  })

  esercizi.value.forEach((es, i) => {
    const lg = svg.append('g')
    
    if (isMobile) {
      const col = i % 2; 
      const row = Math.floor(i / 2);
      lg.attr('transform', `translate(${col * 120}, ${height + 45 + (row * 20)})`)
    } else {
      lg.attr('transform', `translate(${width + 20}, ${i * 25})`)
    }
    
    lg.append('rect')
      .attr('width', 12).attr('height', 12)
      .style('fill', getColore(es))
      .attr('rx', 2)
    
    lg.append('text')
      .attr('x', 18).attr('y', 10)
      .attr('font-size', '12px')
      .attr('fill', '#334155')
      .text(es)
  })
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
      Progressione <span class="text-rose-600">esercizi</span>
    </h1>
    <p class="text-slate-500 mb-8 text-sm md:text-base">Miglioramento dei carichi nel tempo — visualizzato con D3.js</p>

    <div v-if="dati.length === 0" class="text-slate-400 text-center py-16 bg-white rounded-2xl border border-slate-100 mb-10">
      Nessun dato disponibile. Inserisci i tuoi allenamenti nell'Area Personale.
    </div>

    <div v-show="dati.length > 0" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 mb-10 w-full overflow-hidden">
      <div id="grafico" class="w-full"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <div v-for="(item, index) in dati" :key="index"
        class="bg-white rounded-xl border border-slate-100 shadow-sm p-5 md:p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="mb-4">
          <h2 class="text-xl font-bold text-slate-800">{{ item.esercizio }}</h2>
          <p class="text-sm text-slate-500 mt-1">📅 {{ item.data }}</p>
          <p class="text-sm text-slate-600 mt-2">Volume: {{ item.serie }} serie da {{ item.ripetizioni }} rip.</p>
        </div>
        <div class="pt-4 border-t border-slate-50 text-right">
          <span class="font-extrabold text-2xl" :style="{ color: getColore(item.esercizio) }">
            {{ item.peso }} kg
          </span>
        </div>
      </div>
    </div>

  </div>
</template>