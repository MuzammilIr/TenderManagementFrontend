'use client'; // This is a Client Component

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToTenders = () => {
    router.push('/tenders');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="flex justify-end p-4 bg-white shadow-md">
        <button
          onClick={navigateToLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Login
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center bg-gray-100">
        <button
          onClick={navigateToTenders}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg text-2xl"
        >
          View All Available Tenders
        </button>
      </div>
    </div>
  );
}
