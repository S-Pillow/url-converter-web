# URL Converter Web

A browser-based utility for safely handling URLs during security research and
incident response. All processing happens locally in the browser; URLs are not
sent to a server.

## Features

- **Sanitize URLs** by converting `http`/`https` to `hXXp`/`hXXps` and `.` to
  `[.]`.
- **Unsanitize URLs**, including forms that use `[://]`, such as
  `hXXps[://]example[.]com`.
- **Extract domains** from normal or sanitized URLs and remove duplicates.
- Process multiple URLs at once, with one URL per line.
- Copy processed output to the clipboard.

## Examples

| Action | Input | Output |
| --- | --- | --- |
| Sanitize | `https://example.com/path` | `hXXps://example[.]com/path` |
| Unsanitize | `hXXp[://]example[.]com` | `http://example.com` |
| Extract | `https://www.example.com/path` | `example.com` |

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local address shown by Vite.

## Test and build

```bash
npm test
npm run build
```

The production build is written to `dist/`.

## Privacy

The converter has no backend or analytics integration. Input remains in the
browser unless you explicitly copy or otherwise share it.

## License

Licensed under the [MIT License](LICENSE).
