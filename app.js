const searchInput = document.querySelector(
  '.search-bar-wrapper input[type="text"]'
);
const suggestionBox = document.querySelector(".search-suggestions");
const suggestions = [
  "Pizza",
  "Kasko sığorta",
  "Endirimli mağazalar",
  "Restoranlar",
  "Elektronika",
  "Sığorta",
  "Bakıda mağazalar",
];

if (searchInput && suggestionBox) {
  searchInput.addEventListener("input", function () {
    const val = this.value.toLowerCase();
    suggestionBox.innerHTML = "";
    if (val.length > 0) {
      suggestions
        .filter((s) => s.toLowerCase().includes(val))
        .forEach((s) => {
          const item = document.createElement("div");
          item.textContent = s;
          item.onclick = () => {
            searchInput.value = s;
            suggestionBox.innerHTML = "";
          };
          suggestionBox.appendChild(item);
        });
    }
  });
  document.addEventListener("click", (e) => {
    if (!suggestionBox.contains(e.target) && e.target !== searchInput)
      suggestionBox.innerHTML = "";
  });
}

const filterBtns = document.querySelectorAll(".filter-btn");
const categoryCards = document.querySelectorAll(".category-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    categoryCards.forEach((card) => {
      if (filter === "Hamısı" || card.dataset.category === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const compareList = [];
const compareListEl = document.getElementById("compare-list");
categoryCards.forEach((card) => {
  card.addEventListener("dblclick", () => {
    if (!compareList.includes(card.textContent)) {
      compareList.push(card.textContent);
      renderCompareList();
    }
  });
});
function renderCompareList() {
  compareListEl.innerHTML = "";
  compareList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    compareListEl.appendChild(li);
  });
}

const historyList = [];
const historyListEl = document.getElementById("history-list");
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    historyList.push(card.textContent);
    if (historyList.length > 10) historyList.shift();
    renderHistoryList();
  });
});
function renderHistoryList() {
  historyListEl.innerHTML = "";
  historyList
    .slice()
    .reverse()
    .forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      historyListEl.appendChild(li);
    });
}

const reviewForm = document.getElementById("review-form");
const reviewListEl = document.getElementById("review-list");
const reviews = [];
if (reviewForm) {
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const service = document.getElementById("review-service").value;
    const rating = document.getElementById("review-rating").value;
    const comment = document.getElementById("review-comment").value;
    if (service && rating && comment) {
      reviews.push({ service, rating, comment });
      renderReviews();
      reviewForm.reset();
    }
  });
}
function renderReviews() {
  reviewListEl.innerHTML = "";
  reviews
    .slice()
    .reverse()
    .forEach((r) => {
      const li = document.createElement("li");
      li.textContent = `${r.service} | Reytinq: ${r.rating} | ${r.comment}`;
      reviewListEl.appendChild(li);
    });
}

const loginModal = document.getElementById("login-modal");
const closeModalBtn = document.querySelector(".close-modal");
const loginBtn = document.getElementById("login-btn");
document.querySelector(".logo").addEventListener("dblclick", () => {
  loginModal.style.display = "flex";
});
if (closeModalBtn)
  closeModalBtn.onclick = () => (loginModal.style.display = "none");
if (loginBtn)
  loginBtn.onclick = () => {
    alert("Demo: Qeydiyyat üçün backend lazımdır.");
    loginModal.style.display = "none";
  };
window.onclick = function (event) {
  if (event.target === loginModal) loginModal.style.display = "none";
};

const recommendationBox = document.getElementById("recommendation-box");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.filter === "Sığorta") {
      recommendationBox.textContent =
        "Sığorta üçün xüsusi kampaniya: 20% endirim!";
    } else {
      recommendationBox.textContent = "Sizə uyğun yeni təkliflər tezliklə!";
    }
  });
});

const findNearbyBtn = document.querySelector(".find-nearby-btn");
if (findNearbyBtn) {
  findNearbyBtn.onclick = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        alert(
          "Yaxınlıqdakı xidmətlər göstərilir: " +
            pos.coords.latitude +
            "," +
            pos.coords.longitude
        );
      });
    } else {
      alert("Geolokasiya dəstəklənmir.");
    }
  };
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
