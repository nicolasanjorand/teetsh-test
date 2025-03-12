import type { Route } from "./+types/home";
import { useEffect, useState } from 'react';
import type { Programmation } from "../models";
import ProgrammationTable from '../components/programmationTable';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teetsh Test" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [dataProgrammations, setDataProgrammations] = useState<Programmation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = import.meta.env.VITE_API_KEY;

    fetch('https://strapi.teetsh.com/api/programmations/10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDataProgrammations(data.data.attributes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-10">
      <ProgrammationTable programmation={dataProgrammations} />
        
    </div>
  );
}
