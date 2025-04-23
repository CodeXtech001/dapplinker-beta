// app/page.tsx
export const runtime = 'edge'
export const dynamic = 'force-dynamic' // important for SSR proxying

async function getHTML() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
    cache: 'no-store',
  });
  return res.text();
}

export default async function Page() {
  const html = await getHTML();

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
