import type { Route } from "./+types/home";
import { useEffect, useState } from 'react';
import type { Programmation } from "../models";
import ProgrammationTable from '../components/programmationTable';

export const niveaux = [
  { key: "ps", label: "Petite section" },
  { key: "ms", label: "Moyenne section" },
  { key: "gs", label: "Grande section" },
  { key: "cp", label: "Cours préparatoire (CP)" },
  { key: "ce1", label: "Cours élémentaire 1 (CE1)" },
  { key: "ce2", label: "Cours élémentaire 2 (CE2)" },
  { key: "cm1", label: "Cours moyen 1 (CM1)" },
  { key: "cm2", label: "Cours moyen 2 (CM2)" }
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teetsh Test" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [dataProgrammations, setDataProgrammations] = useState<Programmation | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableDirection, setTableDirection] = useState<'periodes' | 'domaines'>('periodes');

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
    <div className="flex flex-col gap-3 p-5 md:p-10 ">
      <div className="flex flex-row w-full justify-end gap-3">
        <div className="text-xs md:text-sm">
        <select
          id="niveau"
          name="niveau"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {niveaux.map((niveau) => (
            <option key={niveau.key} value={niveau.key}>
              {niveau.label}
            </option>
          ))}
        </select>
      </div>
        <button 
            className="cursor-pointer text-xs md:text-sm bg-amber-50 text-amber-500 border-amber-500 border-1 px-3 py-2 rounded-full hover:text-amber-600 hover:border-amber-600 transition-all duration-300 ease-in-out self-end" 
            onClick={() => {setTableDirection(tableDirection == 'periodes' ? 'domaines' : 'periodes')}}
        >
          Intervertir les colonnes/lignes
        </button>
      </div>
       
      <ProgrammationTable tableDirection={tableDirection} programmation={dataProgrammations} />
        
    </div>
  );
}
