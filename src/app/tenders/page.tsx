'use client';

import { useEffect, useState } from 'react';

type Tender = {
  _id: string;
  title: string;
  description: string;
};

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tenders'); // Ensure this matches your backend route
        const data = await response.json();
        setTenders(data);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Tenders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenders.map((tender) => (
          <div key={tender._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{tender.title}</h2>
            <p className="text-gray-700">{tender.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
