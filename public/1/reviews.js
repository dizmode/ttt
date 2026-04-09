const reviews = [
  {
    name: "Local Customer",
    rating: 5,
    text: "Amazing tie-dye selection and super friendly service. Found exactly what I wanted."
  },
  {
    name: "Happy Shopper",
    rating: 5,
    text: "Great custom print quality and fast turnaround. Highly recommend this shop."
  },
  {
    name: "Returning Visitor",
    rating: 5,
    text: "Fun designs, fair prices, and a welcoming vibe every time I stop by."
  },
  {
    name: "Tourist from Nanaimo",
    rating: 5,
    text: "Unique shirts and lucky gear you can’t find elsewhere. Worth the visit."
  }
];

function pickRandomItems(list, count) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

function renderRandomReviews() {
  const container = document.getElementById("random-reviews");
  if (!container) return;

  const selected = pickRandomItems(reviews, 2);

  container.innerHTML = selected
    .map(
      (r) => `
      <article class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div class="text-yellow-500 mb-2">${"★".repeat(r.rating)}</div>
        <p class="text-gray-700 mb-3">“${r.text}”</p>
        <p class="text-sm font-semibold text-gray-900">— ${r.name}</p>
      </article>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderRandomReviews);