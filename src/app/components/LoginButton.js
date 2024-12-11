import { useState } from 'react';

export default function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (role) => {
    window.location.href = `/login?role=${role}`;
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <button
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-600"
              onClick={() => handleLogin('admin')}
            >
              Login as Admin
            </button>
            <button
              className="block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleLogin('bidder')}
            >
              Login as Bidder
            </button>
            <button
              className="block w-full mt-4 px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
