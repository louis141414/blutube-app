import Link from "next/link";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <h1 className="text-xl font-bold">History</h1>
      <p className="mt-2 text-[#9aa3b5]">
        Watch history is not persisted yet on this demo instance.
      </p>
      <Link href="/" className="mt-6 inline-block text-[#8eb0ff] hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
