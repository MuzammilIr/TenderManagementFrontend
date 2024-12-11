import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const role = router.query.role || 'bidder';
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Login successful!');
      router.push('/');
    } else {
      alert('Login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-100 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Login as {role}</h1>
        <input
          className="block w-full mb-4 p-2 border rounded"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="block w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
