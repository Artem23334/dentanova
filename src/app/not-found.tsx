/** Fallback 404 for requests outside the localized routes (rare). */
export default function GlobalNotFound() {
  return (
    <html lang="uk">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, color: "#0b1d3a" }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: 64, fontWeight: 700, margin: 0 }}>404</p>
          <p>Сторінку не знайдено · Nie znaleziono strony · Page not found</p>
          <a href="/" style={{ color: "#2563c9" }}>DentaNova</a>
        </main>
      </body>
    </html>
  );
}
