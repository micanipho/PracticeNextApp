import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h2>Not Found</h2>
      <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>Could not find requested resource</p>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
