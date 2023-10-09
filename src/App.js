import { useEffect, useState } from "react";
import supabase from "./superbase";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);
  const [loader, setLoader] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function getFact() {
      let query = supabase.from("fact").select("*");

      if (currentCategory !== "all")
        query = query.eq("category", currentCategory);

      let { data: fact, error } = await query
        .order("id", { ascending: false })
        .limit(100);
      setFacts(fact);
      setLoader(false);
    }
    getFact();
  }, [currentCategory]);

  return (
    <>
      <Header setShowForm={setShowForm} showForm={showForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {loader ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}

function Loader() {
  return <div className="message">Loading...</div>;
}

function Header({ setShowForm, showForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="./img/logo.png" alt="My Website Logo" />
        <h1>React Project</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => {
          setShowForm((show) => !show);
        }}
      >
        {showForm ? "Close" : "Share A Fact"}
      </button>
    </header>
  );
}

function isValidURL(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (text && isValidURL(source) && category && text.length <= 200) {
      const newFact = {
        text,
        source,
        category,
      };
      await supabase.from("fact").insert([newFact]).select();

      setFacts((currentData) => [newFact, ...currentData]);

      setText("");
      setSource("");
      setCategory("");
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share A Fact With The Words...."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="URL Link Resource...."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose Category:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name} key={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-category"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  if (facts.length === 0) {
    return (
      <span className="message">
        No Fact For This Category Yet! Create First One
      </span>
    );
  }
  return (
    <section>
      <ul className="fact-list">
        {facts.map((data) => (
          <Fact fact={data} key={data.id} />
        ))}
      </ul>
      <p>There are {facts.length} facts.</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Sources)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="voet-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
