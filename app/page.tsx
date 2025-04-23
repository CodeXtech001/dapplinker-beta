export const dynamic = 'force-dynamic';
export const runtime = 'edge'; // Optional: use 'nodejs' if not using edge functions

const REAL_SITE = 'https://your-real-site.com'; // <-- change this

async function getHTML() {
  const res = await fetch(REAL_SITE, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
    cache: 'no-store',
  });

  const html = await res.text();
  return fixRelativeUrls(html);
}

function fixRelativeUrls(html: string) {
  // Replace relative href/src with absolute ones
  return html.replace(/(href|src|action)="\/(.*?)"/g, `$1="${REAL_SITE}/$2"`);
}

export default async function Page() {
  const html = await getHTML();

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
