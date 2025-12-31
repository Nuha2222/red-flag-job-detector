import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Defining the red flags
const RED_FLAGS = [
  {
    id: "salary",
    title: "No Salary Transparency",
    keywords: ["competitive salary", "salary commensurate", "doe", "depending on experience"],
    description:
      "The listing does not include a clear salary range, making it harder to evaluate fair compensation upfront.",
  },
  {
    id: "fast-paced",
    title: "Fast-Paced Environment",
    keywords: ["fast-paced", "high-pressure environment"],
    description:
      "This phrase is often used without context and may indicate heavy workloads or tight deadlines.",
  },
  {
    id: "many-hats",
    title: "Multiple Responsibilities",
    keywords: ["wear many hats", "varied responsibilities", "multiple roles"],
    description:
      "This may suggest unclear role boundaries and expectations beyond the original job scope.",
  },
  {
    id: "unpaid",
    title: "Unpaid Trial Period",
    keywords: ["unpaid trial", "trial period without pay", "unpaid probation"],
    description:
      "Requesting unpaid work during the hiring process can be exploitative.",
  },
  {
    id: "hours",
    title: "Long or Irregular Hours",
    keywords: ["long hours", "nights and weekends", "extended hours", "overtime required"],
    description:
      "Mentions of extended work hours may signal poor work–life balance.",
  },
  {
    id: "urgent",
    title: "Urgent Hiring",
    keywords: ["immediate start", "asap", "urgently hiring"],
    description:
      "Urgent hiring language can sometimes indicate high turnover or internal issues.",
  },
  {
    id: "growth",
    title: "Growth Mentioned Without Details",
    keywords: ["growth opportunity", "career growth", "room for growth"],
    description:
      "Growth is mentioned, but without specific details about mentorship or promotion paths.",
  },
];


function App() {
  const [jobText, setJobText] = useState("");
  const [results, setResults] = useState([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  //setting the job text to lowercase
  function analyzeJobDescription() {
    const text = jobText.toLowerCase();
    const foundFlags = [];

    //if the words in RED_FLAGS are found in job description, push the red flag
    RED_FLAGS.forEach((flag) => {
      const match = flag.keywords.some((keyword) =>
        text.includes(keyword)
      );

      if (match) {
        foundFlags.push(flag);
      }
    });

    setResults(foundFlags);
    setHasAnalyzed(true);
  }


  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Red Flag Job Detector</h1>
        <p>
          Paste a job description below to identify common warning signs that may
          be worth asking about during interviews.
        </p>
      </header>

      {/* Input Section */}
      <section className="input-section">
        <label htmlFor="jobDescription">Job Description</label>

        <textarea
          id="jobDescription"
          placeholder="Paste the full job description here..."
          rows="8"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
        />

        <button
          onClick={analyzeJobDescription}
          disabled={!jobText.trim()}
        >
          Analyze Job Description
        </button>

      </section>

      {/* Results Section */}
      <section className="results-section">
        {!hasAnalyzed && (
          <p className="placeholder">
            Results will appear here after analysis.
          </p>
        )}

        {hasAnalyzed && results.length === 0 && (
          <p>
            ✅ No common red flags detected. This listing appears relatively clear,
            but it’s always good to ask questions during interviews.
          </p>
        )}

        {results.length > 0 && (
          <div>
            <h2>Potential Red Flags</h2>
            <div className="results-list">
              {results.map((flag) => (
                <div key={flag.id} className="results-item">
                  <strong>{flag.title}</strong>
                  <p>{flag.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}

export default App;