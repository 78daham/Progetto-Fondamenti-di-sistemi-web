<script setup>
import imgEnter from '../assets/data binding2.png'
import imgAssi from '../assets/Assi.png'
import imgRete from '../assets/rete-nodi.jpg'
import imgMondo from '../assets/mondo.jpg'
import imgGaraBarre from '../assets/gara-barre.png'
import imgPallini from '../assets/pallini.png'
import imgSole from '../assets/sunburst.png'

const capitoliD3 = [
  {
    titolo: "1. Selezioni",
    testo: "Le selezioni sono il modo in cui D3 individua gli elementi nel DOM per modificarli. Somigliano a jQuery ma sono ottimizzate per il data-binding. I metodi principali sono <code>d3.select()</code> e <code>d3.selectAll()</code>. D3 sfrutta il method chaining, permettendo di applicare attributi o stili in sequenza.",
    codice: `// Seleziona tutti i paragrafi, cambia il colore e aggiunge una classe
    d3.selectAll("p")
    .style("color", "blue") // Cambia lo stile CSS
    .attr("class", "text-highlight") // Modifica un attributo HTML
    .text("Testo modificato da D3!"); // Cambia il contenuto testuale`
  },
  {
    titolo: "2. Data Binding",
    testo: "Il Data Binding è il cuore pulsante di D3: è il processo che associa un array di dati agli elementi del DOM. Storicamente, si basa sul pattern Enter, Update, Exit:",
    lista: [
      { grassetto: "Enter:", testo: "Dati che non hanno ancora un elemento DOM corrispondente." },
      { grassetto: "Update:", testo: "Dati che sono già associati a un elemento DOM esistente." },
      { grassetto: "Exit:", testo: "Elementi DOM che non hanno più un dato associato." }
    ],
    immagine: imgEnter
  },
  {
    titolo: "3. Scales (Scale)",
    testo: "Le scale sono funzioni matematiche che mappano una dimensione astratta dei dati a una dimensione visiva. Esistono due concetti fondamentali: <strong>Domain</strong> (i limiti dei dati in input) e <strong>Range</strong> (i limiti visivi in output).",
    codice: `// Scala lineare per l'asse Y di un grafico
    const yScale = d3.scaleLinear()
    .domain([0, 100])      // I nostri dati vanno da 0 a 100
    .range([500, 0]);      // I pixel vanno da 500 a 0

// Uso della scala
console.log(yScale(50)); // Restituisce 250`
  },
  {
    titolo: "4. Assi",
    testo: "Gli assi in D3 sono la rappresentazione visiva delle Scale. Creano automaticamente le linee, le tacche (ticks) e le etichette di testo tramite generatori come <code>axisTop</code>, <code>axisBottom</code>, ecc.",
    immagine: imgAssi
  },
  {
    titolo: "5. SVG e forme geometriche",
    testo: "D3 si appoggia fortemente a SVG. A differenza del Canvas, SVG mantiene un albero DOM dei suoi elementi, rendendo ogni forma un nodo interattivo e ispezionabile. Gli elementi più usati sono <code>rect</code>, <code>circle</code>, <code>line</code> e <code>path</code>.",
    codice: `// Aggiunge un rettangolo SVG al DOM
    svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 50)
    .attr('height', 25)
    .attr('fill', 'steelblue')`
  },
  {
    titolo: "6. Generatori di forme",
    testo: "Per evitare di scrivere a mano i complessi attributi <code>d</code> dei tag <code>path</code>, D3 offre i Generatori di forme. Esempi classici sono <code>d3.line()</code>, <code>d3.area()</code> e <code>d3.arc()</code>."
  },
  {
    titolo: "7. Transizioni",
    testo: "Le transizioni permettono di animare i cambiamenti del DOM nel tempo, interpolando gradualmente gli attributi e gli stili dai vecchi valori ai nuovi tramite metodi come <code>.transition()</code> e <code>.duration()</code>."
  },
  {
    titolo: "8. Eventi e interattività",
    testo: "D3 gestisce gli eventi nativi del browser tramite il metodo <code>.on()</code>. Questo permette di creare interattività, mostrare tooltip o aggiornare grafici al click."
  },
  {
    titolo: "9. Layouts",
    testo: "I layout in D3 non disegnano nulla. Sono moduli matematici che calcolano le proprietà necessarie per disegnare visualizzazioni complesse (es. Force Layout, Hierarchy Layouts, Stack Layout).",
    immagine: imgRete
  },
  {
    titolo: "10. Caricamento dati",
    testo: "D3 include metodi di utility basati sulla moderna Fetch API per caricare file asincroni: <code>d3.csv()</code>, <code>d3.json()</code>. Restituiscono delle Promise da gestire con il <code>.then()</code>."
  },
  {
    titolo: "11. Pattern General Update (.join)",
    testo: "D3 v5 ha introdotto il metodo <code>.join()</code>, che semplifica il pattern General Update gestendo automaticamente Enter, Update e Exit in una sola riga di codice.",
    codice: `// Esempio logico di Stack Layout
    const data = [{anno: 2020, mele: 10, pere: 20}];

    const stack = d3.stack()
    .keys(["mele", "pere"]);

    const stackedData = stack(data);`
  },
  {
    titolo: "12. Proiezioni geografiche",
    testo: "D3 è celebre per le mappe geografiche basate sul formato standard GeoJSON. Usa le Proiezioni (es. <code>d3.geoMercator</code>) per convertire latitudini/longitudini 3D in coordinate 2D sullo schermo.",
    immagine: imgMondo
  }
];

const galleriaEsempi = [
  {
    titolo: "Bar Chart Race",
    immagine: imgGaraBarre,
    descrizione: "Sfrutta le transizioni per animare i dati.",
    codice: `svg.selectAll("rect")
    .data(datiCorrenti)
    .join("rect")
    .transition()
    .attr("width", d => x(d.valore));`
  },
  {
    titolo: "Force-Directed Graph",
    immagine: imgPallini,
    descrizione: "Simula forze fisiche tra nodi.",
    codice: `const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links))
    .force("charge", d3.forceManyBody());`
  },
  {
    titolo: "Zoomable Sunburst",
    immagine: imgSole,
    descrizione: "Rappresenta dati gerarchici complessi.",
    codice: `svg.append("path")
    .attr("d", d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1));`
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 md:space-y-12 pb-20 pt-10 px-4 w-full">
    
    <section v-for="capitolo in capitoliD3" :key="capitolo.titolo" class="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 w-full overflow-hidden">
      <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{{ capitolo.titolo }}</h2>
      
      <p class="text-slate-600 mb-4 text-sm md:text-base" v-html="capitolo.testo"></p>

      <ul v-if="capitolo.lista" class="list-disc list-inside text-slate-600 space-y-2 mb-6 ml-2 md:ml-4 text-sm md:text-base">
        <li v-for="punto in capitolo.lista" :key="punto.grassetto">
          <strong>{{ punto.grassetto }}</strong> {{ punto.testo }}
        </li>
      </ul>

      <img v-if="capitolo.immagine" :src="capitolo.immagine" :alt="'Immagine ' + capitolo.titolo" class="w-full max-w-2xl mx-auto rounded-xl border border-slate-200 mt-4">
      
      <div v-if="capitolo.codice" class="bg-slate-900 rounded-lg p-3 md:p-4 overflow-x-auto mt-4 w-full">
        <pre><code class="text-green-400 text-xs md:text-sm font-mono whitespace-pre">{{ capitolo.codice }}</code></pre>
      </div>
      
    </section>

    <section class="mt-16 border-t border-slate-200 pt-10 w-full">
      <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">Galleria Esempi Ufficiali D3.js</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        
        <div v-for="esempio in galleriaEsempi" :key="esempio.titolo" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col w-full">
          <img :src="esempio.immagine" :alt="'Esempio ' + esempio.titolo" class="w-full max-w-2xl mx-auto h-40 md:h-48 object-cover border-b border-slate-100">
          <div class="p-5 grow flex flex-col">
            <h3 class="font-bold text-lg text-slate-800 mb-2">{{ esempio.titolo }}</h3>
            <p class="text-sm text-slate-600 mb-4">{{ esempio.descrizione }}</p>
            
            <div class="bg-slate-900 rounded-lg p-3 mt-auto w-full overflow-x-auto">
              <pre><code class="text-green-400 text-xs font-mono whitespace-pre">{{ esempio.codice }}</code></pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>