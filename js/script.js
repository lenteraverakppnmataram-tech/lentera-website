// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Mobile dropdown functionality
const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");
mobileDropdowns.forEach((dropdown) => {
  const btn = dropdown.querySelector(".mobile-dropdown-btn");
  const menu = dropdown.querySelector(".mobile-dropdown-menu");
  const icon = dropdown.querySelector(".mobile-dropdown-icon");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("hidden");
    icon.style.transform = menu.classList.contains("hidden")
      ? "rotate(0deg)"
      : "rotate(180deg)";
  });
});

// CTA Button actions
document.getElementById("cta-button-1").addEventListener("click", () => {
  window.open(
    "https://klc2.kemenkeu.go.id/listcourse",
    "_blank",
    "noopener,noreferrer"
  );
});

document.getElementById("cta-button-2").addEventListener("click", () => {
  window.open("https://linktr.ee/csomataram", "_blank", "noopener,noreferrer");
});

// Training Slider functionality
let currentTrainingSlide = 0;
const trainingSlider = document.getElementById("training-slider");
let trainingSlides = []; // Akan diisi secara dinamis dari fetch
const trainingDots = document.querySelectorAll(".training-dot");
const trainingPrevBtn = document.getElementById("training-prev");
const trainingNextBtn = document.getElementById("training-next");
let trainingAutoplayInterval;

function showTrainingSlide(index) {
  if (!trainingSlides || trainingSlides.length === 0) return;

  // Infinite loop logic
  if (index >= trainingSlides.length) {
    currentTrainingSlide = 0;
  } else if (index < 0) {
    currentTrainingSlide = trainingSlides.length - 1;
  } else {
    currentTrainingSlide = index;
  }

  // Use the updated currentTrainingSlide for calculations
  index = currentTrainingSlide;

  // Calculation for translation
  const slideWidth = trainingSlides[0].offsetWidth + 24; // width + gap (24px = 1.5rem)
  if (trainingSlider) {
    trainingSlider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  trainingDots.forEach((dot) => dot.classList.remove("bg-blue-600"));
  trainingDots.forEach((dot) => dot.classList.add("bg-blue-300"));
  if (trainingDots[index]) {
    trainingDots[index].classList.remove("bg-blue-300");
    trainingDots[index].classList.add("bg-blue-600");
  }

  // This was misplaced. It should be part of the logic above.
  // currentTrainingSlide = index;
}
function nextTrainingSlide() {
  showTrainingSlide(currentTrainingSlide + 1);
}

function startTrainingAutoplay() {
  stopTrainingAutoplay();
  trainingAutoplayInterval = setInterval(nextTrainingSlide, 5000); // Change slide every 5 seconds
}

function stopTrainingAutoplay() {
  clearInterval(trainingAutoplayInterval);
}

if (trainingPrevBtn) {
  trainingPrevBtn.addEventListener("click", () => {
    stopTrainingAutoplay();
    showTrainingSlide(currentTrainingSlide - 1);
    startTrainingAutoplay();
  });
}

if (trainingNextBtn) {
  trainingNextBtn.addEventListener("click", () => {
    stopTrainingAutoplay();
    showTrainingSlide(currentTrainingSlide + 1);
    startTrainingAutoplay();
  });
}

trainingDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopTrainingAutoplay();
    showTrainingSlide(index);
    startTrainingAutoplay();
  });
});

// Initialize training slider
if (trainingSlides.length > 0) {
  showTrainingSlide(0);
  startTrainingAutoplay();
  // Pause autoplay on hover
  const trainingContainer = document.querySelector(
    ".training-slider-container"
  );
  trainingContainer.addEventListener("mouseenter", stopTrainingAutoplay);
  trainingContainer.addEventListener("mouseleave", startTrainingAutoplay);
}

// Gallery Slider Functionality
let currentGallerySlide = 0;
const gallerySlider = document.getElementById("gallery-slider");
let gallerySlides = []; // Akan diisi secara dinamis dari fetch
const galleryPrevBtn = document.getElementById("gallery-prev");
const galleryNextBtn = document.getElementById("gallery-next");
let galleryAutoplayInterval;

function getSlidesToShow() {
  if (window.innerWidth >= 1024) {
    return 3;
  }
  if (window.innerWidth >= 640) {
    return 2;
  }
  return 1;
}

function showGallerySlide(index) {
  if (!gallerySlider || gallerySlides.length === 0) return;

  const slidesToShow = getSlidesToShow();
  const maxIndex = gallerySlides.length - slidesToShow;

  // Infinite loop logic
  if (index > maxIndex) {
    currentGallerySlide = 0;
  } else if (index < 0) {
    currentGallerySlide = maxIndex;
  } else {
    currentGallerySlide = index;
  }

  const slideWidth = gallerySlides[0].offsetWidth;
  gallerySlider.style.transform = `translateX(-${
    currentGallerySlide * slideWidth
  }px)`;
}

function nextGallerySlide() {
  showGallerySlide(currentGallerySlide + 1);
}

function startGalleryAutoplay() {
  stopGalleryAutoplay();
  galleryAutoplayInterval = setInterval(nextGallerySlide, 4000); // Change slide every 4 seconds
}

function stopGalleryAutoplay() {
  clearInterval(galleryAutoplayInterval);
}

function initializeGallerySlider() {
  gallerySlides = document.querySelectorAll(".gallery-slide"); // Perbarui node list
  if (gallerySlides.length > 0) {
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener("click", () => {
        stopGalleryAutoplay();
        showGallerySlide(currentGallerySlide - 1);
        startGalleryAutoplay();
      });
    }
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener("click", () => {
        stopGalleryAutoplay();
        showGallerySlide(currentGallerySlide + 1);
        startGalleryAutoplay();
      });
    }

    const galleryContainer = document.querySelector(".gallery-slider-container");
    galleryContainer.addEventListener("mouseenter", stopGalleryAutoplay);
    galleryContainer.addEventListener("mouseleave", startGalleryAutoplay);

    window.addEventListener("resize", () => showGallerySlide(currentGallerySlide));
    startGalleryAutoplay();
  }
}

// =============================================
// FUNGSI UNTUK MEMUAT KONTEN SECARA DINAMIS
// =============================================
async function loadTrainings() {
  if (!trainingSlider) return;

  try {
    const response = await fetch('data/pelatihan.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const trainings = await response.json();

    const trainingsHTML = trainings.map(item => `
      <div class="training-slide flex-shrink-0 w-80 lg:w-96" id="${item.id}">
        <div class="flex flex-col bg-white rounded-xl shadow-lg p-6 lg:p-8 card-shadow-beautiful border-l-4 border-blue-600 sparkle h-full">
          <div class="flex items-start justify-between mb-4 lg:mb-6">
            <div class="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-lg flex items-center justify-center floating">
              ${item.ikon}
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs lg:text-sm font-medium px-2.5 py-0.5 rounded-full">
              ${item.kategori}
            </span>
          </div>
          <div class="card-text-block">
            <h3 class="text-lg lg:text-xl font-semibold text-blue-900 mb-3 lg:mb-4">${item.judul}</h3>
            <p class="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6 dark:text-gray-400">${item.deskripsi}</p>
          </div>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm lg:text-base touch-friendly mt-auto">
            Mulai Belajar
            <svg class="ml-1 w-4 h-4" fill="currentColor" viewbox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    `).join('');

    trainingSlider.innerHTML = trainingsHTML;
    trainingSlides = document.querySelectorAll(".training-slide"); // Update node list

    // Initialize slider after content is loaded
    if (trainingSlides.length > 0) {
      showTrainingSlide(0);
      startTrainingAutoplay();
      const trainingContainer = document.querySelector(".training-slider-container");
      trainingContainer.addEventListener("mouseenter", stopTrainingAutoplay);
      trainingContainer.addEventListener("mouseleave", startTrainingAutoplay);
    }
  } catch (error) {
    console.error("Gagal memuat data pelatihan:", error);
    trainingSlider.innerHTML = '<p class="text-center text-red-500 w-full">Gagal memuat data pelatihan.</p>';
  }
}

async function loadGallery() {
  if (!gallerySlider) return;

  try {
    const response = await fetch('data/galeri.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); // Pastikan path 'data/galeri.json' benar
    const galleryItems = await response.json();

    const galleryHTML = galleryItems.map(item => `
      <div class="gallery-slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
        <a href="${item.url}" target="_blank" class="block rounded-xl overflow-hidden card-shadow-beautiful group">
          <img src="${item.url}" alt="${item.alt}" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" loading="lazy" />
        </a>
      </div>
    `).join('');

    gallerySlider.innerHTML = galleryHTML;
    initializeGallerySlider(); // Inisialisasi slider setelah konten dimuat

  } catch (error) {
    console.error("Gagal memuat galeri:", error);
    gallerySlider.innerHTML = '<p class="text-center text-red-500 w-full">Gagal memuat galeri.</p>';
  }
}

// Podcast Slider functionality
let currentPodcastSlide = 0;
const podcastSlider = document.getElementById("podcast-slider");
const podcastSlides = document.querySelectorAll(".podcast-slide");
const podcastDots = document.querySelectorAll(".podcast-dot");
const podcastPrevBtn = document.getElementById("podcast-prev");
const podcastNextBtn = document.getElementById("podcast-next");

function showPodcastSlide(index) {
  if (!podcastSlides || podcastSlides.length === 0) return;
  if (index >= podcastSlides.length) index = 0;
  if (index < 0) index = podcastSlides.length - 1;

  const slideWidth = 100; // percentage
  if (podcastSlider) {
    podcastSlider.style.transform = `translateX(-${index * slideWidth}%)`;
  }

  podcastDots.forEach((dot) => dot.classList.remove("bg-purple-600"));
  podcastDots.forEach((dot) => dot.classList.add("bg-purple-300"));
  if (podcastDots[index]) {
    podcastDots[index].classList.remove("bg-purple-300");
    podcastDots[index].classList.add("bg-purple-600");
  }

  currentPodcastSlide = index;
}

if (podcastPrevBtn) {
  podcastPrevBtn.addEventListener("click", () => {
    showPodcastSlide(currentPodcastSlide - 1);
  });
}

if (podcastNextBtn) {
  podcastNextBtn.addEventListener("click", () => {
    showPodcastSlide(currentPodcastSlide + 1);
  });
}

podcastDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showPodcastSlide(index);
  });
});

// Initialize podcast slider
if (podcastSlides.length > 0) {
  showPodcastSlide(0);
}

// Google Maps functionality
function openInGoogleMaps() {
  const address =
    "Jl. Langko No.40, Dasan Agung Baru, Kec. Selaparang, Kota Mataram, Nusa Tenggara Barat 83125";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
}

// News Management System
const newsData = [
  {
    id: 1,
    type: "podcast",
    title: "TRIPOD Episode 2: Transfer ke Daerah",
    description:
      "Pembahasan mendalam tentang Transfer ke Daerah dan perannya dalam pemerataan pembangunan di Indonesia",
    date: "2025-01-20",
    category: "Podcast",
    icon: "podcast",
    color: "from-purple-500 to-purple-700",
    url: "https://youtu.be/Hl6OkUcGUao?si=WS4BSFs3xQ9Kd4-3",
  },
  {
    id: 2,
    type: "podcast",
    title: "TRIPOD Episode 1: Integritas",
    description:
      "Integritas sebagai pondasi utama dalam melaksanakan tugas dan pelayanan publik di KPPN Mataram",
    date: "2025-01-18",
    category: "Podcast",
    icon: "podcast",
    color: "from-indigo-500 to-indigo-700",
    url: "https://youtu.be/ln10oBUbuk0?si=4DtviGvCnoKouix2",
  },
  {
    id: 3,
    type: "training",
    title: "Pelatihan E-Learning Terbaru",
    description:
      "Peluncuran modul pembelajaran online terbaru untuk aparatur daerah dalam pengelolaan keuangan",
    date: "2025-01-15",
    category: "Pelatihan",
    icon: "training",
    color: "from-blue-500 to-blue-700",
    url: "https://klc2.kemenkeu.go.id/listcourse",
  },
  {
    id: 4,
    type: "sosialisasi",
    title: "Sosialisasi Pengelolaan Keuangan Daerah",
    description:
      "Pelaksanaan sosialisasi pengelolaan keuangan daerah untuk kabupaten/kota se-NTB",
    date: "2025-01-12",
    category: "Sosialisasi",
    icon: "presentation",
    color: "from-green-500 to-green-700",
    url: "#",
  },
];

function getIconSVG(iconType) {
  const icons = {
    podcast:
      '<path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"/>',
    training:
      '<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>',
    presentation: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    mou: '<path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>',
  };
  return icons[iconType] || icons.presentation;
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Makassar",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

function renderNewsItem(item) {
  return `
              <div class="news-card bg-white rounded-lg overflow-hidden card-shadow-beautiful sparkle cursor-pointer transition-transform hover:scale-105" onclick="window.open('${
                item.url
              }', '_blank', 'noopener,noreferrer')">
                  <div class="h-48 lg:h-56 bg-gradient-to-br ${
                    item.color
                  } flex items-center justify-center">
                      <svg class="w-16 h-16 lg:w-20 lg:h-20 text-white floating" fill="currentColor" viewBox="0 0 20 20">
                          ${getIconSVG(item.icon)}
                      </svg>
                  </div>
                  <div class="p-6 lg:p-8 flex flex-col flex-grow">
                      <div class="flex items-center justify-between mb-2">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              ${item.category}
                          </span>
                      </div>
                      <div class="card-text-block">
                        <h3 class="font-semibold text-blue-900 mb-2 lg:mb-3 text-base lg:text-lg line-clamp-2">${
                          item.title
                        }</h3>
                        <p class="text-gray-600 text-sm lg:text-base mb-3 lg:mb-4 line-clamp-3 dark:text-gray-400">${
                          item.description
                        }</p>
                      </div>
                      <span class="text-xs lg:text-sm text-yellow-600 font-medium mt-auto">${formatDate(
                        item.date
                      )}</span>
                  </div>
              </div>
          `;
}

function loadNews() {
  const newsContainer = document.getElementById("news-container");
  const newsLoading = document.getElementById("news-loading");
  const newsEmpty = document.getElementById("news-empty");

  if (!newsContainer || !newsLoading || !newsEmpty) return;

  // Show loading state
  newsLoading.classList.remove("hidden");
  newsContainer.innerHTML = "";
  newsEmpty.classList.add("hidden");

  // Simulate loading delay
  setTimeout(() => {
    // Sort news by date (newest first)
    const sortedNews = newsData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Take only the latest 4 items
    const latestNews = sortedNews.slice(0, 4);

    if (latestNews.length === 0) {
      newsEmpty.classList.remove("hidden");
    } else {
      newsContainer.innerHTML = latestNews.map(renderNewsItem).join("");
    }

    newsLoading.classList.add("hidden");
  }, 1000);
}

// Function to add new news item (for future use)
function addNewsItem(newsItem) {
  newsItem.id = Date.now(); // Simple ID generation
  newsData.unshift(newsItem); // Add to beginning of array
  loadNews(); // Refresh the display
}

// Search functionality
const searchData = [
  {
    title: "Pengantar Pengelolaan Belanja Daerah",
    type: "Pelatihan",
    category: "Keuangan Daerah",
    url: "https://klc2.kemenkeu.go.id/course/e-learning-pengantar-pengelolaan-belanja-daerah-open-access-fd353104/overview",
  },
  {
    title: "Pengantar Pengelolaan Transfer ke Daerah (TKD)",
    type: "Pelatihan",
    category: "Transfer ke Daerah",
    url: "https://klc2.kemenkeu.go.id/course/e-learning-pengantar-pengelolaan-transfer-ke-daerah-tkd-open-access-2e9d198a/overview",
  },
  {
    title: "Pengantar Pengelolaan Keuangan Daerah",
    type: "Pelatihan",
    category: "Keuangan Daerah",
    url: "https://klc2.kemenkeu.go.id/course/e-learning-pengantar-pengelolaan-keuangan-daerah-open-access-ee6b2b55/overview",
  },
  {
    title: "Pengelolaan Belanja Desa",
    type: "Pelatihan",
    category: "Keuangan Desa",
    url: "https://klc2.kemenkeu.go.id/course/e-learning-pengelolaan-belanja-desa-open-access-687ea311/overview",
  },
  {
    title: "Pelaporan Keuangan Daerah",
    type: "Pelatihan",
    category: "Keuangan Daerah",
    url: "https://klc2.kemenkeu.go.id/listcourse",
  },
  {
    title: "Monitoring Transfer Daerah",
    type: "Pelatihan",
    category: "Transfer ke Daerah",
    url: "https://klc2.kemenkeu.go.id/listcourse",
  },
  {
    title: "E-Learning",
    type: "Layanan",
    category: "Edukasi",
    url: "https://klc2.kemenkeu.go.id/listcourse",
  },
  {
    title: "CSO Mataram",
    type: "Layanan",
    category: "Konsultasi",
    url: "https://linktr.ee/csomataram",
  },
  {
    title: "Mandalika Pemda",
    type: "Informasi",
    category: "Mandalika",
    url: "http://linktr.ee/mandalikatkd",
  },
  {
    title: "WhatsApp Konsultasi",
    type: "Layanan",
    category: "Konsultasi",
    url: "https://wa.me/6281234567890",
  },
  {
    title: "Email LENTERA",
    type: "Kontak",
    category: "Kontak",
    url: "mailto:lenteravera.kppnmataram@gmail.com",
  },
];

function performSearch(query) {
  if (!query || query.length < 2) return [];

  const lowercaseQuery = query.toLowerCase();
  return searchData
    .filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.type.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, 8);
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("search-results");
  if (!searchResults) return;

  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="p-4 text-gray-500 text-sm">Tidak ada hasil ditemukan</div>';
    searchResults.classList.remove("hidden");
    return;
  }

  const resultsHTML = results
    .map(
      (item) => `
              <div class="search-result-item p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer touch-friendly" onclick="window.open('${item.url}', '_blank', 'noopener,noreferrer')">
                  <div class="flex items-center justify-between">
                      <div>
                          <h4 class="text-sm font-medium text-blue-900">${item.title}</h4>
                          <p class="text-xs text-gray-600">${item.type} • ${item.category}</p>
                      </div>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                  </div>
              </div>
          `
    )
    .join("");

  searchResults.innerHTML = resultsHTML;
  searchResults.classList.remove("hidden");
}

// Search input event listeners
const searchInput = document.getElementById("search-input");
const mobileSearchInput = document.getElementById("mobile-search-input");
let searchTimeout;

function handleSearchInput(e) {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim();

  if (query.length < 2) {
    const searchResults = document.getElementById("search-results");
    if (searchResults) {
      searchResults.classList.add("hidden");
    }
    return;
  }

  searchTimeout = setTimeout(() => {
    const results = performSearch(query);
    displaySearchResults(results);
  }, 300);
}

if (searchInput) {
  searchInput.addEventListener("input", handleSearchInput);
  searchInput.addEventListener("focus", (e) => {
    const query = e.target.value.trim();
    if (query.length >= 2) {
      const results = performSearch(query);
      displaySearchResults(results);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const results = performSearch(e.target.value.trim());
      if (results.length > 0) {
        window.open(results[0].url, "_blank", "noopener,noreferrer");
      }
    }
  });
}

if (mobileSearchInput) {
  mobileSearchInput.addEventListener("input", handleSearchInput);
  mobileSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const results = performSearch(e.target.value.trim());
      if (results.length > 0) {
        window.open(results[0].url, "_blank", "noopener,noreferrer");
      }
    }
  });
}

// Hide search results when clicking outside
document.addEventListener("click", (e) => {
  const searchResults = document.getElementById("search-results");
  if (
    searchResults &&
    !e.target.closest("#search-input") &&
    !e.target.closest("#search-results") &&
    !e.target.closest("#mobile-search-input")
  ) {
    searchResults.classList.add("hidden");
  }
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scroll-to-top");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.remove("opacity-0", "invisible");
      scrollToTopBtn.classList.add("opacity-100", "visible");
    } else {
      scrollToTopBtn.classList.add("opacity-0", "invisible");
      scrollToTopBtn.classList.remove("opacity-100", "visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Element SDK Configuration (jika ada)
if (
  typeof defaultConfig !== "undefined" &&
  typeof onConfigChange !== "undefined" &&
  typeof mapToCapabilities !== "undefined" &&
  typeof mapToEditPanelValues !== "undefined"
) {
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues,
    });
  }
}

// Slideshow functionality
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slide-dot");
const prevBtn = document.querySelector(".slide-prev");
const nextBtn = document.querySelector(".slide-next");

function showSlide(index) {
  if (!slides || slides.length === 0) return;
  // Ensure index is within bounds
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
    slide.style.zIndex = "1";
  });

  dots.forEach((dot) => dot.classList.remove("active"));

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active");
    slides[index].style.opacity = "1";
    slides[index].style.zIndex = "2";
  }

  if (dots[index]) {
    dots[index].classList.add("active");
  }

  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startSlideshow() {
  stopSlideshow(); // Clear any existing interval
  slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
}

function stopSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// Event listeners for navigation
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    stopSlideshow();
    nextSlide();
    startSlideshow();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    stopSlideshow();
    prevSlide();
    startSlideshow();
  });
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopSlideshow();
    showSlide(index);
    startSlideshow();
  });
});

// Initialize slideshow
if (slides.length > 0) {
  showSlide(0);
  startSlideshow();
}

// Initialize news system
loadNews();

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

const slideshowContainer = document.querySelector(".slideshow-container");
if (slideshowContainer) {
  slideshowContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slideshowContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      stopSlideshow();
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
      startSlideshow();
    }
  }
}

// Enhanced mobile interactions
if ("ontouchstart" in window) {
  // Add touch-friendly classes for mobile devices
  document.body.classList.add("touch-device");

  // Improve dropdown behavior on touch devices
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (button && menu) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        // Close other open dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((otherMenu) => {
          if (otherMenu !== menu) {
            otherMenu.classList.add("hidden");
          }
        });
        menu.classList.toggle("hidden");
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.add("hidden");
      });
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add staggered animation effect
      const delay = entry.target.dataset.staggerDelay || "0";
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("is-visible");
      self.unobserve(entry.target); // Stop observing after animation
    }
  });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll(".card-shadow-beautiful");
animatedElements.forEach((el) => {
  el.classList.add("stagger-animation");
  // Apply a staggered delay based on index within its parent grid
  const parent = el.parentElement;
  if (
    (parent && parent.classList.contains("responsive-grid")) ||
    parent.classList.contains("lg:grid-cols-4")
  ) {
    const siblings = Array.from(parent.children);
    const elIndexInParent = siblings.indexOf(el);
    el.dataset.staggerDelay = elIndexInParent * 150; // Increased delay for a more noticeable effect
  }
  observer.observe(el);
});

// Dark Mode Functionality
const darkModeToggle = document.getElementById("dark-mode-toggle");
const mobileDarkModeToggle = document.getElementById("mobile-dark-mode-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const mobileSunIcon = document.getElementById("mobile-sun-icon");
const mobileMoonIcon = document.getElementById("mobile-moon-icon");

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    mobileSunIcon.classList.add("hidden");
    mobileMoonIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    mobileSunIcon.classList.remove("hidden");
    mobileMoonIcon.classList.add("hidden");
  }
};

const toggleTheme = () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
};

darkModeToggle.addEventListener("click", toggleTheme);
mobileDarkModeToggle.addEventListener("click", toggleTheme);

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);

  // Load dynamic content
  loadTrainings();
  loadGallery();
});
