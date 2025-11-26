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

// Training Slider functionality
let currentTrainingSlide = 0;
const trainingSlider = document.getElementById("training-slider");
let trainingSlides = []; // Akan diisi secara dinamis dari fetch
let trainingDots = []; // Akan diisi secara dinamis
const trainingPrevBtn = document.getElementById("training-prev");
const trainingNextBtn = document.getElementById("training-next");
let trainingAutoplayInterval;

function showTrainingSlide(index) {
  if (!trainingSlides || trainingSlides.length === 0) return;

  // Simplified infinite loop logic
  const totalSlides = trainingSlides.length;
  currentTrainingSlide = (index + totalSlides) % totalSlides;

  // Calculation for translation
  const slideWidth = trainingSlides[0].offsetWidth + 24; // width + gap (24px = 1.5rem)
  if (trainingSlider) {
    trainingSlider.style.transform = `translateX(-${currentTrainingSlide * slideWidth}px)`;
  }

  trainingDots.forEach((dot) => dot.classList.remove("bg-blue-600"));
  trainingDots.forEach((dot) => dot.classList.add("bg-blue-300"));
  if (trainingDots[index]) {
    trainingDots[index].classList.remove("bg-blue-300");
    trainingDots[index].classList.add("bg-blue-600");
  }
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

function initializeTrainingSlider() {
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

    const galleryContainer = document.querySelector(
      ".gallery-slider-container"
    );
    galleryContainer.addEventListener("mouseenter", stopGalleryAutoplay);
    galleryContainer.addEventListener("mouseleave", startGalleryAutoplay);

    window.addEventListener("resize", () =>
      showGallerySlide(currentGallerySlide)
    );
    startGalleryAutoplay();
  }
}

// =============================================
// FUNGSI UNTUK MEMUAT KONTEN SECARA DINAMIS
// =============================================
function loadTrainings(trainings) {
  // `trainings` di sini adalah data yang sudah difilter atau data lengkap
  if (!trainingSlider) return;

  try {
    const trainingsHTML = trainings
      .map(
        (item) => `
      <div class="training-slide flex-shrink-0 w-80 lg:w-96" id="${item.id}">
        <div class="card-shadow-beautiful rounded-xl h-full card-3d-tilt">
          <div class="card-inner flex flex-col bg-white rounded-xl p-6 lg:p-8 border-l-4 border-blue-600 sparkle h-full">
            <div class="flex items-start justify-between mb-4 lg:mb-6">
              <div class="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-lg flex items-center justify-center floating">
                ${item.ikon}
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs lg:text-sm font-medium px-2.5 py-0.5 rounded-full category-tag">
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
      </div>
    `
      )
      .join("");

    trainingSlider.innerHTML = trainingsHTML;
    trainingSlides = document.querySelectorAll(".training-slide"); // Update node list

    // Buat dots secara dinamis
    const dotsContainer = document.getElementById("training-dots-container");
    if (dotsContainer) {
      const dotsHTML = trainings
        .map(
          (_, index) => `
        <button class="training-dot w-3 h-3 rounded-full bg-blue-300 transition-all" data-slide="${index}"></button>
      `
        )
        .join("");
      dotsContainer.innerHTML = dotsHTML;
      trainingDots = document.querySelectorAll(".training-dot"); // Update node list dots

      // Tambahkan event listener ke dots yang baru dibuat
      trainingDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          stopTrainingAutoplay();
          showTrainingSlide(index);
          startTrainingAutoplay();
        });
      });
    }

    initializeTrainingSlider(); // Panggil fungsi inisialisasi
  } catch (error) {
    console.error("Gagal memuat data pelatihan:", error);
    trainingSlider.innerHTML =
      '<p class="text-center text-red-500 w-full">Gagal memuat data pelatihan.</p>';
  }
}

function setupTrainingFilters(allTrainings) {
  const filterContainer = document.getElementById("training-filter-container");
  if (!filterContainer) return;

  // 1. Dapatkan kategori unik
  const categories = [
    "Semua",
    ...new Set(allTrainings.map((item) => item.kategori)),
  ];

  // 2. Buat tombol filter
  filterContainer.innerHTML = categories
    .map(
      (category) =>
        `<button class="training-filter-btn" data-category="${category}">${category}</button>`
    )
    .join("");

  const filterButtons = filterContainer.querySelectorAll(".training-filter-btn");

  // 3. Tambahkan event listener
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      // Update status aktif pada tombol
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter data pelatihan
      let filteredTrainings;
      if (selectedCategory === "Semua") {
        filteredTrainings = allTrainings;
      } else {
        filteredTrainings = allTrainings.filter(
          (item) => item.kategori === selectedCategory
        );
      }

      // Muat ulang slider dengan data yang sudah difilter
      loadTrainings(filteredTrainings);
    });
  });

  // 4. Set "Semua" sebagai filter aktif secara default
  if (filterButtons.length > 0) {
    filterButtons[0].click(); // Simulasikan klik pada tombol "Semua"
  }
}

function initialize3DTilt() {
  const tiltCards = document.querySelectorAll(".card-3d-tilt");

  tiltCards.forEach((card) => {
    const cardInner = card.querySelector(".card-inner");
    if (!cardInner) return; // Lewati jika tidak ada elemen inner

    const floatingIcon = cardInner.querySelector(".floating");
    const cardTextBlock = cardInner.querySelector(".card-text-block");
    let sparkle = null;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const { width, height } = rect;
      const rotateX = (y / height - 0.5) * -20; // Max rotation
      const rotateY = (x / width - 0.5) * 20; // Max rotation

      cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Tambahkan efek 3D pada elemen anak
      if (floatingIcon) floatingIcon.style.transform = "translateZ(50px)";
      if (cardTextBlock) cardTextBlock.style.transform = "translateZ(25px)";

      // Gerakkan efek kilauan
      if (sparkle) {
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
      }
    });

    card.addEventListener("mouseenter", (e) => {
      cardInner.style.transition = "transform 0.1s ease-out";

      // Buat dan tambahkan elemen kilauan
      sparkle = document.createElement("div");
      sparkle.classList.add("sparkle-effect");
      cardInner.appendChild(sparkle);

      // Atur posisi awal kilauan
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
    });

    card.addEventListener("mouseleave", () => {
      cardInner.style.transition =
        "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";

      // Reset posisi elemen anak juga
      if (floatingIcon) floatingIcon.style.transform = "translateZ(0px)";
      if (cardTextBlock) cardTextBlock.style.transform = "translateZ(0px)";
      cardInner.style.transform = "rotateX(0deg) rotateY(0deg)";

      // Hapus elemen kilauan
      if (sparkle) {
        sparkle.remove();
        sparkle = null;
      }
    });
  });
}

function loadGallery(galleryItems) {
  if (!gallerySlider) return;

  try {
    const galleryHTML = galleryItems
      .map(
        (item) => `
      <div class="gallery-slide flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
        <a href="${item.url}" target="_blank" class="block rounded-xl overflow-hidden card-shadow-beautiful group">
          <img src="${item.url}" alt="${item.alt}" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" loading="lazy" />
        </a>
      </div>
    `
      )
      .join("");

    gallerySlider.innerHTML = galleryHTML;
    initializeGallerySlider(); // Inisialisasi slider setelah konten dimuat

    // Re-initialize observer for new elements
    observeAnimatedElements();
  } catch (error) {
    console.error("Gagal memuat galeri:", error);
    gallerySlider.innerHTML =
      '<p class="text-center text-red-500 w-full">Gagal memuat galeri.</p>';
  }
}

// Podcast Slider functionality
let currentPodcastSlide = 0;
let podcastSlider = document.getElementById("podcast-slider");
let podcastSlides = [];
let podcastDots = [];
const podcastPrevBtn = document.getElementById("podcast-prev");
const podcastNextBtn = document.getElementById("podcast-next");
let podcastAutoplayInterval;

function showPodcastSlide(index) {
  if (!podcastSlides || podcastSlides.length === 0) return;

  const slidesToShow = getPodcastSlidesToShow();
  const maxIndex = Math.max(0, podcastSlides.length - slidesToShow);

  if (index > maxIndex && maxIndex > 0) {
    // Hindari reset jika hanya ada satu halaman
    currentPodcastSlide = 0;
  } else if (index < 0) {
    currentPodcastSlide = maxIndex;
  } else {
    currentPodcastSlide = index;
  }

  const slideWidth = podcastSlides[0].offsetWidth;
  if (podcastSlider) {
    podcastSlider.style.transform = `translateX(-${
      currentPodcastSlide * slideWidth
    }px)`;
  }

  podcastDots.forEach((dot) => dot.classList.remove("bg-purple-600"));
  podcastDots.forEach((dot) => dot.classList.add("bg-purple-300"));
  // Sesuaikan dot yang aktif
  if (podcastDots[currentPodcastSlide]) {
    podcastDots[currentPodcastSlide].classList.remove("bg-purple-300");
    podcastDots[currentPodcastSlide].classList.add("bg-purple-600");
  }
}

function getPodcastSlidesToShow() {
  // Di layar medium (md) ke atas, tampilkan 2 slide. Jika tidak, 1.
  return window.innerWidth >= 768 ? 2 : 1;
}

function nextPodcastSlide() {
  showPodcastSlide(currentPodcastSlide + 1);
}

function startPodcastAutoplay() {
  stopPodcastAutoplay();
  podcastAutoplayInterval = setInterval(nextPodcastSlide, 7000);
}

function stopPodcastAutoplay() {
  clearInterval(podcastAutoplayInterval);
}

function loadPodcasts(podcasts) {
  if (!podcastSlider) return;
  try {
    const podcastsHTML = podcasts
      .map(
        (item) => `
      <div class="podcast-slide flex-shrink-0 w-full md:w-1/2 px-3" id="${item.id}">
        <div class="flex flex-col bg-white rounded-xl shadow-lg p-6 card-shadow-beautiful border-l-4 border-${item.color_class}-600 sparkle h-full"> 
          <div class="relative w-full" style="padding-bottom: 56.25%">
            <iframe src="${item.embed_url}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" class="absolute top-0 left-0 w-full h-full rounded-lg"></iframe>
          </div>
          <div class="flex-grow pt-6 flex flex-col">
            <div class="flex items-start justify-start mb-4">
              <div class="w-12 h-12 bg-${item.color_class}-100 rounded-lg flex items-center justify-center floating flex-shrink-0 mr-4">
                <svg class="w-6 h-6 text-${item.color_class}-600" fill="currentColor" viewbox="0 0 20 20"><path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.146-3.32a1 1 0 00-.776-.07L2 14.056V5.944l1.461.63a1 1 0 00.776-.07l4.146-3.32z" clip-rule="evenodd"/></svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-lg font-semibold text-blue-900 mb-1">${item.title}</h3>
                <span class="bg-${item.color_class}-100 text-${item.color_class}-800 text-xs font-medium px-2.5 py-1 rounded-full">${item.episode}</span>
              </div>
            </div>
            <p class="text-gray-600 text-sm mt-2 flex-grow dark:text-gray-400">${item.description}</p>
          </div>
          <a href="${item.watch_url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-${item.color_class}-600 hover:text-${item.color_class}-800 font-medium text-sm touch-friendly mt-4">
            Tonton Sekarang
            <svg class="ml-1 w-4 h-4" fill="currentColor" viewbox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/></svg>
          </a>
        </div>
      </div>
    `
      )
      .join("");
    podcastSlider.innerHTML = podcastsHTML;

    // Initialize slider after content is loaded
    podcastSlides = document.querySelectorAll(".podcast-slide");
    const dotsContainer = document.getElementById("podcast-dots-container");
    if (dotsContainer) {
      const slidesToShow = getPodcastSlidesToShow();
      const numDots = Math.max(1, podcasts.length - slidesToShow + 1);

      dotsContainer.innerHTML = Array.from(
        { length: numDots },
        (_, index) =>
          `<button class="podcast-dot w-3 h-3 rounded-full bg-purple-300 transition-all" data-slide="${index}"></button>`
      ).join("");
      podcastDots = document.querySelectorAll(".podcast-dot");
      podcastDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Klik dot akan langsung menuju ke posisi slide yang sesuai
          stopPodcastAutoplay();
          showPodcastSlide(index);
          startPodcastAutoplay();
        });
      });
    }

    if (podcastPrevBtn)
      podcastPrevBtn.addEventListener("click", () => {
        stopPodcastAutoplay();
        showPodcastSlide(currentPodcastSlide - 1);
        startPodcastAutoplay();
      });
    if (podcastNextBtn)
      podcastNextBtn.addEventListener("click", () => {
        stopPodcastAutoplay();
        showPodcastSlide(currentPodcastSlide + 1);
        startPodcastAutoplay();
      });

    const podcastContainer = document.querySelector(
      ".podcast-slider-container"
    );
    if (podcastContainer) {
      podcastContainer.addEventListener("mouseenter", stopPodcastAutoplay);
      podcastContainer.addEventListener("mouseleave", startPodcastAutoplay);
    }

    window.addEventListener("resize", () =>
      showPodcastSlide(currentPodcastSlide)
    );
    showPodcastSlide(0);
    startPodcastAutoplay();

    // Re-initialize observer for new elements
    observeAnimatedElements();
  } catch (error) {
    console.error("Gagal memuat podcast:", error);
    podcastSlider.innerHTML =
      '<p class="text-center text-red-500 w-full">Gagal memuat podcast.</p>';
  }
}

// Google Maps functionality
function openInGoogleMaps() {
  const address =
    "Jl. Langko No.40, Dasan Agung Baru, Kec. Selaparang, Kota Mataram, Nusa Tenggara Barat 83125";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
}

function loadSiteContent(content) {
  if (!content) return;

  // Helper to set content
  const setContent = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  };

  // Header
  setContent("site-title", content.header.title);
  setContent("site-subtitle", content.header.subtitle);

  // Hero
  setContent("hero-title", content.hero.title);
  setContent("hero-subtitle", content.hero.subtitle);
  setContent("hero-cta1", content.hero.cta1);
  setContent("hero-cta2", content.hero.cta2);
  document
    .getElementById("hero-cta1")
    ?.addEventListener("click", () =>
      window.open("https://klc2.kemenkeu.go.id/listcourse", "_blank")
    );
  document
    .getElementById("hero-cta2")
    ?.addEventListener("click", () =>
      window.open("https://linktr.ee/csomataram", "_blank")
    );

  // About
  setContent("about-title", content.about.title);
  setContent("about-description", content.about.description);
  content.about.features.forEach((feature, i) => {
    setContent(`about-feature-${i}-title`, feature.title);
    setContent(`about-feature-${i}-desc`, feature.description);
  });

  // Sections
  setContent("services-title", content.services.title);
  content.services.items.forEach((item, i) => {
    setContent(`service-${i}-title`, item.title);
    setContent(`service-${i}-desc`, item.description);
    setContent(
      `service-${i}-points`,
      item.points.map((p) => `<li>• ${p}</li>`).join("")
    );
  });
  setContent("training-title", content.training.title);
  setContent("training-description", content.training.description);
  setContent("podcast-title", content.podcast.title);
  setContent("podcast-description", content.podcast.description);
  setContent("news-title", content.news.title);
  setContent("gallery-title", content.gallery.title);
  setContent("gallery-description", content.gallery.description);
  setContent("location-title", content.location.title);
  setContent("location-description", content.location.description);

  // Footer
  setContent("footer-support-text", content.footer.support_text);
  setContent("footer-address", content.footer.address);
  setContent("copyright-text", content.footer.copyright);
}

// News Management System

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
              <div class="news-card bg-white rounded-lg overflow-hidden card-shadow-beautiful sparkle cursor-pointer card-3d-effect" onclick="window.open('${
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

function loadNews(newsData) {
  const newsContainer = document.getElementById("news-container");
  const skeletonContainer = document.getElementById("news-skeleton-container");
  const newsEmpty = document.getElementById("news-empty");

  if (!newsContainer || !skeletonContainer || !newsEmpty) return;

  // Show loading state
  skeletonContainer.classList.remove("hidden");
  newsContainer.innerHTML = "";
  newsEmpty.classList.add("hidden");

  try {
    // Sort news by date (newest first)
    const sortedNews = newsData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Take only the latest 4 items
    const latestNews = sortedNews.slice(0, 4);

    skeletonContainer.classList.add("hidden");
    if (latestNews.length === 0) {
      newsEmpty.classList.remove("hidden");
    } else {
      newsContainer.innerHTML = latestNews.map(renderNewsItem).join("");

      // Re-initialize observer for new elements
      observeAnimatedElements();
    }
  } catch (error) {
    console.error("Gagal memuat berita:", error);
    skeletonContainer.classList.add("hidden");
    newsEmpty.classList.remove("hidden");
    newsContainer.innerHTML =
      '<p class="text-center text-red-500 w-full">Gagal memuat berita.</p>';
  }
}

// Search functionality
const searchData = [
  // Data pencarian akan dibuat secara dinamis
];

function buildSearchData(allData) {
  const { trainings, podcasts, news, siteContent } = allData;

  const trainingData = trainings.map((item) => ({
    title: item.judul,
    type: "Pelatihan",
    category: item.kategori,
    url: item.url,
  }));

  const podcastData = podcasts.map((item) => ({
    title: item.title,
    type: "Podcast",
    category: "Media",
    url: item.watch_url,
  }));

  const newsData = news.map((item) => ({
    title: item.title,
    type: "Berita",
    category: item.category,
    url: item.url,
  }));

  // Anda bisa menambahkan lebih banyak data dari siteContent jika perlu
  // Contoh:
  const serviceData = siteContent.services.items.map((item) => ({
    title: item.title,
    type: "Layanan",
    category: "Layanan Unggulan",
    url: "#", // atau link ke section yang relevan
  }));

  searchData.push(...trainingData, ...podcastData, ...newsData, ...serviceData);
}

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

function observeAnimatedElements() {
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(
    ".card-shadow-beautiful:not(.is-visible)"
  );
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
}

// =============================================
// FUNGSI UNTUK DROPDOWN NAVIGASI
// =============================================
function initializeDropdowns() {
  document.addEventListener("click", (e) => {
    // Cari tahu apakah yang diklik adalah tombol dropdown
    const isDropdownButton = e.target.matches("[data-dropdown-button]");

    // Jika klik terjadi di dalam menu dropdown yang sudah terbuka, jangan lakukan apa-apa.
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) {
      return;
    }

    let currentDropdown;
    if (isDropdownButton) {
      // Jika tombol dropdown diklik, cari parent-nya dan toggle kelas 'is-active'
      currentDropdown = e.target.closest("[data-dropdown]");
      currentDropdown.classList.toggle("is-active");
    }

    // Tutup SEMUA dropdown lain yang mungkin sedang terbuka.
    // Ini akan berjalan baik saat membuka dropdown baru atau saat mengklik di luar.
    document.querySelectorAll("[data-dropdown].is-active").forEach((dropdown) => {
      if (dropdown === currentDropdown) return;
      dropdown.classList.remove("is-active");
    });
  });
}

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
document.addEventListener("DOMContentLoaded", async () => {
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);

  // Fetch all data concurrently
  try {
    const [trainingsRes, galleryRes, podcastsRes, newsRes, siteContentRes] =
      await Promise.all([
        fetch("pelatihan.json"),
        fetch("galeri.json"),
        fetch("podcast.json"),
        fetch("berita.json"),
        fetch("site_content.json"),
      ]);

    const trainings = await trainingsRes.json();
    const gallery = await galleryRes.json();
    const podcasts = await podcastsRes.json();
    const news = await newsRes.json();
    const siteContent = await siteContentRes.json();

    // Load content into the page
    loadSiteContent(siteContent);
    // loadTrainings(trainings); // Dihapus karena akan dipanggil oleh setupTrainingFilters
    setupTrainingFilters(trainings); // Panggil fungsi baru untuk setup filter
    loadGallery(gallery);
    loadPodcasts(podcasts);
    loadNews(news);

    // Build search data dynamically
    buildSearchData({ trainings, podcasts, news, siteContent });

    // Initialize animations
    observeAnimatedElements();
    initialize3DTilt();
    initializeDropdowns(); // Panggil fungsi dropdown

    // Fungsi refresh saat klik Beranda
    const berandaLinkDesktop = document.getElementById("beranda-link-desktop");
    const berandaLinkMobile = document.getElementById("beranda-link-mobile");

    const handleBerandaClick = (e) => {
      e.preventDefault(); // Mencegah link mengikuti href="#"
      location.reload(); // Me-refresh halaman
    };

    if (berandaLinkDesktop)
      berandaLinkDesktop.addEventListener("click", handleBerandaClick);
    if (berandaLinkMobile)
      berandaLinkMobile.addEventListener("click", handleBerandaClick);
  } catch (error) {
    console.error("Gagal memuat data awal situs:", error);
    // Tampilkan pesan error umum di halaman jika diperlukan
  }
});
