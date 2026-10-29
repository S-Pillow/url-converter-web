// Sanitize URLs by obfuscating protocols and dots.
export function sanitizeUrls(urls) {
  return urls.map((url) => {
    let cleaned = url.trim();

    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = `http://${cleaned}`;
    }

    return cleaned
      .replace(/^https:\/\//i, "hXXps://")
      .replace(/^http:\/\//i, "hXXp://")
      .replace(/\./g, "[.]");
  });
}

// Unsanitize URLs by restoring defanged separators, protocols, and dots.
export function unsanitizeUrls(urls) {
  return urls.map((url) => {
    let cleaned = url
      .trim()
      .replace(/\[:\/\/\]/g, "://")
      .replace(/^hXXps:\/\//i, "https://")
      .replace(/^hXXp:\/\//i, "http://")
      .replace(/\[\.\]/g, ".");

    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = `http://${cleaned}`;
    }

    return cleaned;
  });
}

// Extract the last two domain labels and remove duplicates.
export function extractDomains(urls) {
  const domains = new Set();

  urls.forEach((raw) => {
    const cleaned = raw
      .trim()
      .replace(/^(hXXps?|https?):\/\//i, "")
      .replace(/\[\.\]/g, ".");
    const match = cleaned.match(/^([^\s/]+)/);

    if (match) {
      const fullDomain = match[1].toLowerCase();
      const parts = fullDomain.split(".");
      domains.add(parts.length >= 2 ? parts.slice(-2).join(".") : fullDomain);
    }
  });

  return Array.from(domains);
}
