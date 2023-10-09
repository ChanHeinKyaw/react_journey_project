const btnOpen = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");
factList.innerHTML = "";

const createFactElement = (initialFacts) => {
  const factHTML = initialFacts.map(
    (el) =>
      `
            <li class="fact">
            <p>
                ${el.text}
                <a
                class="source"
                href="${el.source}"
                target="_blank"
                >(Sources)</a
                >
            </p>
            <span class="tag" style="background-color: #3b82f6">
                ${el.category}</span
            >
            <div class="voet-buttons">
                <button>👍 24</button>
                <button>🤯 9</button>
                <button>⛔️ 4</button>
            </div>
            </li>
        `
  );
  factList.insertAdjacentHTML("afterbegin", factHTML);
};

async function loadFact() {
  const res = await fetch(
    "https://mjtlyszwopqvejzonrgf.supabase.co/rest/v1/fact",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdGx5c3p3b3BxdmVqem9ucmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MTgxMTIsImV4cCI6MjAxMjM5NDExMn0.keYYl5pJe10rw8F1_p5YC3xd7qq6y84eEaTeS6a_vF8",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdGx5c3p3b3BxdmVqem9ucmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MTgxMTIsImV4cCI6MjAxMjM5NDExMn0.keYYl5pJe10rw8F1_p5YC3xd7qq6y84eEaTeS6a_vF8",
      },
    }
  );

  const data = await res.json();
  createFactElement(data);
}
loadFact();

btnOpen.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btnOpen.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btnOpen.textContent = "Share A Fact";
  }
});
