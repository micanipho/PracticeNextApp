import Image from "next/image";
import Link from "next/link";

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
          <Link href="/sign-in">
            Sign In
          </Link>
          <Link href="/sign-up">
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
