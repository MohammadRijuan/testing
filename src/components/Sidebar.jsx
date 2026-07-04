import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link
          href="/dashboard/banners"
          className="block hover:text-blue-400"
        >
          Banner
        </Link>
      </nav>
    </aside>
  );
}