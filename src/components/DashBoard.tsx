import Link from "next/link";

export default function DashBoard() {
  return (
    <>
      <Link href="/resume">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded h-10">
          DashBoard
        </button>
      </Link>
    </>
  );
}
