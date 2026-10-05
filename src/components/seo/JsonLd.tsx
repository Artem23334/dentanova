/**
 * Renders JSON-LD safely. Data comes only from our own config/data files,
 * and "<" is escaped so the content can never close the <script> tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
