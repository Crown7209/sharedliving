"use client";

export default function Home() {
  return (
    <main className="min-h-screen p-8 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold">
          Fullstack Example Expont mind
        </h1>
        {/* Products хэсгийг бүрэн устгав */}
        <div className="mt-8">
          <a
            className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
            href="/auth/login"
          >
            Login
          </a>
          <span className="mx-2">or</span>
          <a
            className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
            href="/auth/register"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
}
