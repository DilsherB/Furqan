// Render Catalogue Items
function renderCatalogue(dataToRender = CATALOGUE_DATA) {
  const container = document.getElementById("catalogueContainer");
  const countLabel = document.getElementById("resultsCount");
  countLabel.innerText = `${dataToRender.length} Items`;

  if (dataToRender.length === 0) {
    container.className = "col-span-full py-12 text-center text-slate-500";
    container.innerHTML = `
                    <div class="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200">
                        <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
                        <h4 class="font-bold text-navy-900 text-base">No Matching Items Found</h4>
                        <p class="text-xs text-slate-500 mt-1">Try resetting your search query or selecting a different commodity category.</p>
                        <button onclick="resetCatalogueFilters()" class="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">Reset Search</button>
                    </div>
                `;
    return;
  }

  if (currentView === "grid") {
    container.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    container.innerHTML = dataToRender
      .map(
        (item) => `
                    
                    <div class="relative min-h-[520px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group">

                        <!-- Full-card background image -->
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        >

                        <!-- Dark gradient over image -->
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/20"></div>

                        <!-- HS Code -->
                        <span class="absolute top-3 left-3 z-20 bg-navy-950/85 text-emerald-400 font-mono text-[11px] px-2.5 py-1 rounded-md font-bold backdrop-blur-sm">
                            HS: ${item.hsCode}
                        </span>

                        <!-- Origin -->
                        <span class="absolute top-3 right-3 z-20 bg-white/90 text-navy-900 text-[10px] px-2.5 py-1 rounded-full font-extrabold shadow">
                            ${item.origin}
                        </span>

                        <!-- Details panel over the image -->
                        <div class="absolute bottom-0 left-0 right-0 z-10 bg-slate-950/35 border-t border-white/20">

                        <!-- Product details -->
                        <div class="p-5 pb-4">

                            <span class="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest bg-emerald-400/15 px-2 py-0.5 rounded">
                                ${item.id}
                            </span>

                            <h3 class="text-lg font-bold text-white mt-2 mb-2 line-clamp-1">
                                ${item.name}
                            </h3>

                            <p class="text-white/80 text-xs mb-4 line-clamp-2 leading-relaxed">
                                ${item.summary}
                            </p>

                                <div class="space-y-1.5 border-t border-white/20 pt-3 text-xs text-white/80">
                                    <div class="flex justify-between">
                                        <span class="text-white/60">MOQ:</span>
                                        <span class="font-bold text-white">${item.moq}</span>
                                    </div>

                                    <div class="flex justify-between">
                                        <span class="text-white/60">Grade:</span>
                                        <span class="font-semibold text-white">${item.grade}</span>
                                    </div>
                                </div>

                        </div>

                            <!-- Action buttons: separate section -->
                            <div class="px-5 py-3 grid grid-cols-2 gap-2 border-t border-white/20 bg-slate-950/25">

                            <button
                                onclick="openSpecModal('${item.id}')"
                                class="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                                <i class="fa-solid fa-circle-info text-emerald-400"></i>
                                Specs
                            </button>

                            <button
                                onclick="addToCart('${item.id}')"
                                class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                                <i class="fa-solid fa-plus"></i>
                                Add Cart
                            </button>

                        </div>
                    </div>
                </div>

                `,
      )
      .join("");
  } else {
    // List View Layout
    container.className = "space-y-4";
    container.innerHTML = dataToRender
      .map(
        (item) => `
                    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row items-center gap-5 justify-between">
                        <div class="flex items-center gap-4 w-full sm:w-auto">
                            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0">
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">${item.id}</span>
                                    <span class="text-[11px] font-mono text-slate-500 font-bold">HS Code: ${item.hsCode}</span>
                                </div>
                                <h3 class="text-base font-bold text-navy-900 mt-1">${item.name}</h3>
                                <p class="text-xs text-slate-500 mt-0.5 max-w-xl line-clamp-1">${item.summary}</p>
                            </div>
                        </div>

                        <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                            <div class="text-right hidden lg:block mr-2">
                                <div class="text-xs font-bold text-slate-800">MOQ: ${item.moq}</div>
                                <div class="text-[10px] text-slate-400">${item.origin}</div>
                            </div>
                            <button onclick="openSpecModal('${item.id}')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors">
                                Full Spec
                            </button>
                            <button onclick="addToCart('${item.id}')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors">
                                + Add Cart
                            </button>
                        </div>
                    </div>
                `,
      )
      .join("");
  }
}

// View Mode Switcher
function setCatalogueView(view) {
  currentView = view;
  const gridBtn = document.getElementById("gridViewBtn");
  const listBtn = document.getElementById("listViewBtn");

  if (view === "grid") {
    gridBtn.className =
      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-navy-900 text-white";
    listBtn.className =
      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-navy-900";
  } else {
    listBtn.className =
      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-navy-900 text-white";
    gridBtn.className =
      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-600 hover:text-navy-900";
  }
  filterCatalogue();
}

// Search & Filter Trigger
function filterCatalogue() {
  const query = document.getElementById("catalogueSearch").value.toLowerCase();
  const category = document.getElementById("catalogueCategory").value;

  const filtered = CATALOGUE_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.hsCode.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);

    const matchesCategory = category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  renderCatalogue(filtered);
}

// Reset Filters
function resetCatalogueFilters() {
  document.getElementById("catalogueSearch").value = "";
  document.getElementById("catalogueCategory").value = "all";
  renderCatalogue(CATALOGUE_DATA);
}

// SPECIFICATION MODAL LOGIC
function openSpecModal(itemId) {
  const item = CATALOGUE_DATA.find((i) => i.id === itemId);
  if (!item) return;

  const modalContent = document.getElementById("modalSpecContent");
  modalContent.innerHTML = `
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">${item.id}</span>
                    <span class="text-xs font-mono font-bold text-slate-500">HS Code: ${item.hsCode}</span>
                </div>
                <h2 class="text-2xl font-extrabold text-navy-900 mb-2">${item.name}</h2>
                <p class="text-xs text-slate-600 mb-6 leading-relaxed">${item.summary}</p>

                <div class="grid sm:grid-cols-2 gap-4 mb-6 text-xs">
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <span class="text-slate-400 block font-semibold mb-1">Material Composition / Spec</span>
                        <span class="font-bold text-navy-900">${item.material}</span>
                    </div>
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <span class="text-slate-400 block font-semibold mb-1">Export Packaging Options</span>
                        <span class="font-bold text-navy-900">${item.packaging}</span>
                    </div>
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <span class="text-slate-400 block font-semibold mb-1">Standard Production Lead Time</span>
                        <span class="font-bold text-navy-900">${item.leadTime}</span>
                    </div>
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <span class="text-slate-400 block font-semibold mb-1">Primary Port of Loading</span>
                        <span class="font-bold text-navy-900">${item.port}</span>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">Quality & Compliance Certifications</h4>
                    <div class="flex flex-wrap gap-2">
                        ${item.certs.map((c) => `<span class="bg-navy-900 text-emerald-400 text-xs px-3 py-1 rounded-lg font-medium"><i class="fa-solid fa-shield-check text-xs mr-1"></i>${c}</span>`).join("")}
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button onclick="downloadSingleItemSpecPDF('${item.id}')" class="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
                        <i class="fa-solid fa-file-pdf text-emerald-600"></i> Download Item Technical PDF
                    </button>
                    <button onclick="addToCart('${item.id}'); closeSpecModal();" class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors shadow">
                        + Add Item to Spec Cart
                    </button>
                </div>
            `;

  document.getElementById("specModal").classList.remove("hidden");
}

// Close Spec Modal
function closeSpecModal() {
  document.getElementById("specModal").classList.add("hidden");
}

