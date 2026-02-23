import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div>
          <a
            href="/sign-in"
          >
            Sign In
          </a>
          <a
            href="/sign-up"
          >
            Sign Up
          </a>
        </div>
      </main>
    </div>
  );
}
