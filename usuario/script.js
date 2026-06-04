import gsap from "gsap";
import { createClient } from "@sanity/client";

// ── Sanity Config ──
const client = createClient({
    projectId: '9m09a5ng',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-28',
});

function urlForSanityImage(source) {
    if (!source || !source.asset || !source.asset._ref) return '';
    const ref = source.asset._ref;
    const parts = ref.split('-');
    if (parts.length !== 4) return '';
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/9m09a5ng/production/${id}-${dimensions}.${format}?w=600&fit=max&auto=format`;
}

// ── Tunnel Config ──
const CONFIG = {
    scrollSpeed: 1.5,
    layerGap: 2500,
    lerp: 0.07,
};

let plantsData = [];
let layerData = [];
let targetScroll = 750;
let currentScroll = 750;
let tunnelDepth = 0;
let visibleDepth = 0;
const exitPoint = 1500;

// ── DOM Elements ──
const spotlightEl = document.querySelector(".spotlight");
const loadingEl = document.getElementById("loading-spinner");

const modal = document.getElementById("plant-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalMainImage = document.getElementById("modal-main-image");
const modalThumbnails = document.getElementById("modal-thumbnails");
const modalHabit = document.getElementById("modal-habit");
const modalScientificName = document.getElementById("modal-scientific-name");
const modalCommonName = document.getElementById("modal-common-name");
const modalBotanyGrid = document.getElementById("modal-botany-grid");
const modalDistrict = document.getElementById("modal-district");
const modalAddress = document.getElementById("modal-address");
const modalRegistrar = document.getElementById("modal-registrar");
const modalDate = document.getElementById("modal-date");

// ── Init ──
async function init() {
    try {
        const query = `*[_type == "planta" && estado_revision == "Validado"] | order(_createdAt desc)`;
        plantsData = await client.fetch(query);

        if (plantsData.length === 0) {
            loadingEl.querySelector('p').innerText = "No hay plantas validadas aún. ¡Sé el primero en registrar una!";
            return;
        }

        buildTunnel(plantsData);
        loadingEl.classList.add('hidden');
        gsap.ticker.add(updateTunnel);

    } catch (error) {
        console.error("Error cargando datos:", error);
        loadingEl.querySelector('p').innerText = "Error al conectar con la base de datos.";
    }
}

// ── Build 3D Tunnel ──
function buildTunnel(data) {
    const totalImages = data.length;
    const contentLayerCount = Math.ceil(totalImages / 4);
    const totalLayerCount = Math.max(contentLayerCount, 6);

    tunnelDepth = totalLayerCount * CONFIG.layerGap;
    visibleDepth = 3 * CONFIG.layerGap;

    const tunnelEl = document.createElement("div");
    tunnelEl.classList.add("tunnel");
    spotlightEl.appendChild(tunnelEl);

    for (let i = 0; i < totalLayerCount; i++) {
        const layerEl = document.createElement("div");
        layerEl.classList.add("layer");

        const imageStartIndex = (i % contentLayerCount) * 4;

        for (let j = 0; j < 4; j++) {
            const index = imageStartIndex + j;
            if (index >= totalImages) break;

            const plant = data[index];

            const angle = (j / 4) * Math.PI * 2 - Math.PI / 2;
            const radiusX = 400;
            const radiusY = 280;
            const itemX = Math.cos(angle) * radiusX - 125;
            const itemY = Math.sin(angle) * radiusY - 175;

            const itemEl = document.createElement("div");
            itemEl.classList.add("item");
            itemEl.style.left = `${itemX}px`;
            itemEl.style.top = `${itemY}px`;
            itemEl.dataset.index = index;

            const imageEl = document.createElement("img");
            const imgSrc = urlForSanityImage(plant.galeria?.[0]);
            if (imgSrc) {
                imageEl.src = imgSrc;
            } else {
                imageEl.style.background = 'linear-gradient(135deg, #1a3a2a, #08130D)';
            }
            imageEl.alt = plant.nombre_cientifico || 'Planta';
            imageEl.loading = 'lazy';
            itemEl.appendChild(imageEl);

            const overlayEl = document.createElement("div");
            overlayEl.classList.add("item-overlay");
            itemEl.appendChild(overlayEl);

            const previewEl = document.createElement("div");
            previewEl.classList.add("item-info-preview");
            const displayName = plant.nombre_cientifico && plant.nombre_cientifico !== 'Por identificar'
                ? plant.nombre_cientifico
                : plant.nombres_comunes || 'Planta';
            previewEl.innerHTML = `
                <h4>${displayName}</h4>
                <p>${plant.habito || 'Sin clasificar'}</p>
            `;
            itemEl.appendChild(previewEl);

            itemEl.addEventListener('click', () => openModal(plant));

            layerEl.appendChild(itemEl);
        }

        tunnelEl.appendChild(layerEl);
        layerData.push({ el: layerEl, baseZ: -i * CONFIG.layerGap });
    }
}

// ── Scroll ──
window.addEventListener("wheel", (e) => {
    targetScroll += e.deltaY * CONFIG.scrollSpeed;
});

// Touch support for mobile
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchmove", (e) => {
    const deltaY = touchStartY - e.touches[0].clientY;
    targetScroll += deltaY * CONFIG.scrollSpeed * 2;
    touchStartY = e.touches[0].clientY;
});

function calculateOverlay(z) {
    if (z > exitPoint) return 1;
    if (z > 0) return z / exitPoint;
    if (z > -visibleDepth) {
        const progress = Math.abs(z) / visibleDepth;
        return progress * progress;
    }
    return 1;
}

function updateTunnel() {
    currentScroll += (targetScroll - currentScroll) * CONFIG.lerp;

    layerData.forEach((layer) => {
        let z = layer.baseZ + currentScroll;
        z = ((z % tunnelDepth) + tunnelDepth) % tunnelDepth;
        z = z - tunnelDepth + exitPoint;

        const overlay = calculateOverlay(z);

        gsap.set(layer.el, {
            z: z,
            "--overlay": Math.min(1, Math.max(0, overlay)),
            visibility: overlay >= 1 ? "hidden" : "visible",
        });
    });
}

// ── Modal Logic ──
function openModal(plant) {
    modalHabit.innerText = plant.habito || 'Desconocido';
    modalScientificName.innerText = plant.nombre_cientifico || 'Por identificar';
    modalCommonName.innerText = plant.nombres_comunes || 'Sin nombres comunes registrados';

    modalDistrict.innerText = plant.distrito || '-';
    modalAddress.innerText = plant.direccion || '-';
    modalRegistrar.innerText = plant.registrador_nombre || '-';

    if (plant._createdAt) {
        const date = new Date(plant._createdAt);
        modalDate.innerText = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
        modalDate.innerText = '-';
    }

    // Gallery
    modalThumbnails.innerHTML = '';
    const images = plant.galeria || [];

    if (images.length > 0) {
        modalMainImage.src = urlForSanityImage(images[0]);

        images.forEach((imgObj, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('thumb-btn');
            if (idx === 0) btn.classList.add('active');

            const img = document.createElement('img');
            const imgUrl = urlForSanityImage(imgObj);
            if (!imgUrl) return;
            img.src = imgUrl;
            img.loading = 'lazy';

            btn.appendChild(img);
            btn.addEventListener('click', () => {
                modalMainImage.style.opacity = 0.5;
                setTimeout(() => {
                    modalMainImage.src = imgUrl;
                    modalMainImage.style.opacity = 1;
                }, 150);

                document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });

            modalThumbnails.appendChild(btn);
        });
    } else {
        modalMainImage.src = '';
        modalMainImage.alt = 'Sin fotos disponibles';
    }

    // Botany Grid (dynamic)
    modalBotanyGrid.innerHTML = '';
    const addInfo = (label, value) => {
        if (!value || value === '' || value === 'Por identificar') return;
        const div = document.createElement('div');
        div.classList.add('info-item');
        div.innerHTML = `<span class="label">${label}</span><span class="value">${value}</span>`;
        modalBotanyGrid.appendChild(div);
    };

    addInfo('Familia', plant.familia);
    addInfo('Tipo de Vida', plant.tipo_vida);
    addInfo('Hábito', plant.habito);

    // Habit-specific data
    const habitMap = {
        'Árbol': plant.arbol_datos,
        'Palmera': plant.palmera_datos,
        'Arbusto': plant.arbusto_datos,
        'Liana': plant.liana_datos,
        'Hierba': plant.hierba_datos,
    };
    const habitData = habitMap[plant.habito];

    if (habitData) {
        addInfo('Altura Total (m)', habitData.altura_total);
        addInfo('CAP (cm)', habitData.cap);
        addInfo('DAP (cm)', habitData.dap);
        addInfo('Tipo de Hoja', habitData.tipo_hoja);
        addInfo('Forma de Copa', habitData.forma_copa);
        addInfo('Diám. Copa (m)', habitData.diametro_copa);
        addInfo('Tipo de Raíz', habitData.tipo_raiz);
        addInfo('Tipo de Fuste', habitData.tipo_fuste);
        addInfo('Tipo de Corteza', habitData.tipo_corteza);
        addInfo('Forma de la Hoja', habitData.forma_hoja);
        addInfo('Margen de Hoja', habitData.margen_hoja);
        addInfo('Disposición', habitData.disposicion_hojas);
        addInfo('Tipo de Inflorescencia', habitData.tipo_inflorescencia);
        addInfo('Tipo de Fruto', habitData.tipo_fruto);
        addInfo('Color de Flor', habitData.color_flor);
        addInfo('Diám. Estípite (cm)', habitData.diametro_estipite);
        addInfo('Alt. Estípite (m)', habitData.altura_estipite);
        addInfo('Tipo de Palmera', habitData.tipo_palmera);
    }

    if (plant.estado_fenologico && plant.estado_fenologico.length > 0) {
        addInfo('Est. Fenológico', plant.estado_fenologico.join(', '));
    }
    if (plant.estado_individuo && plant.estado_individuo.length > 0) {
        addInfo('Est. Individuo', plant.estado_individuo.join(', '));
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ── Dark/Light Mode ──
const themeToggle = document.getElementById('theme-toggle');
const iconMoon = document.getElementById('theme-icon-moon');
const iconSun = document.getElementById('theme-icon-sun');

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark-mode');
    iconMoon.style.display = isDark ? 'none' : 'block';
    iconSun.style.display = isDark ? 'block' : 'block';
    // In dark mode show sun (to switch to light), in light mode show moon (to switch to dark)
    iconMoon.style.display = isDark ? 'none' : 'block';
    iconSun.style.display = isDark ? 'block' : 'none';
}

updateThemeIcons();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeIcons();
});

// ── Start ──
init();