import { useState } from "react";
import { Copy, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { extractDomains, sanitizeUrls, unsanitizeUrls } from "./urlUtils";

function parseInput(input) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handlePasteClean = (event) => {
    const pastedText = event.clipboardData
      .getData("text")
      .replace(/[ \t]+$/gm, "")
      .replace(/\n{2,}/g, "\n");

    event.preventDefault();
    setInputText((current) => current + pastedText);
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <main className="app-shell">
      <header>
        <ShieldCheck className="shield" aria-hidden="true" />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          URL Converter
        </motion.h1>
      </header>

      <section className="converter" aria-label="URL converter">
        <textarea
          aria-label="URLs to process"
          placeholder="Paste URLs here..."
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onPaste={handlePasteClean}
        />

        <div className="output-wrap">
          <textarea
            aria-label="Processed URLs"
            placeholder="Output appears here..."
            value={outputText}
            readOnly
          />
          <button className="copy-button" onClick={handleCopy} type="button">
            <Copy aria-hidden="true" />
            Copy
          </button>
        </div>
      </section>

      <nav className="actions" aria-label="Converter actions">
        <button
          type="button"
          onClick={() => setOutputText(sanitizeUrls(parseInput(inputText)).join("\n"))}
        >
          Sanitize URLs
        </button>
        <button
          type="button"
          onClick={() => setOutputText(unsanitizeUrls(parseInput(inputText)).join("\n"))}
        >
          Unsanitize URLs
        </button>
        <button
          type="button"
          onClick={() => setOutputText(extractDomains(parseInput(inputText)).join("\n"))}
        >
          Extract Domains
        </button>
        <button className="clear-button" type="button" onClick={handleClear}>
          Clear Input/Output
        </button>
      </nav>
    </main>
  );
}
