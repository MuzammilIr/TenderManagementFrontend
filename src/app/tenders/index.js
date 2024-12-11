import { useEffect, useState } from 'react';

export default function Tenders() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      const response = await fetch('/api/tenders'); // Replace with your backend API endpoint
      const data = await response.json();
      setTenders(data);
    };

    fetchTenders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Tenders</h1>
      {tenders.length > 0 ? (
        <ul className="space-y-4">
          {tenders.map((tender) => (
            <li key={tender._id} className="p-4 border rounded">
              <h2 className="font-semibold">{tender.title}</h2>
              <p>{tender.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tenders available</p>
      )}
    </div>
  );
}
