'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'admin' | 'bidder' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelection = (selectedRole: 'admin' | 'bidder') => {
    setRole(selectedRole);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      if (data.token) {
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        router.push(role === 'admin' ? '/admin-dashboard' : '/tenders');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {!role ? (
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => handleRoleSelection('admin')}
          >
            Login as Admin
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => handleRoleSelection('bidder')}
          >
            Login as Bidder
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don’t have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push('/register')}
            >
              Register
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
