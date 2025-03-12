import { useState, useEffect } from "react";
import type { Item, Periode, Programmation } from "../models";

const ProgrammationTable: React.FC<{ programmation: Programmation | null }> = ({ programmation }) => {

    const [rows, setRows] = useState<{ periode: Periode; domaines: { [key: string]: Item[] } }[]>([]);

    useEffect(() => {
        const organizedData = organizeDataForTable(programmation);
        setRows(organizedData);
    }, [programmation]);


    function organizeDataForTable(programmationParameter: Programmation | null) {
        if(programmationParameter?.periodes && programmationParameter.matieres) {
            const { periodes, matieres } = programmationParameter;
    
            // Créer un tableau pour les lignes (périodes)
            const rows = periodes.map((periode: Periode) => {
                // Créer un objet pour chaque période
                const row: { periode: Periode; domaines: { [key: string]: Item[] } } = {
                    periode,
                    domaines: {},
                };
        
                // Remplir les colonnes (domaines) pour cette période
                matieres.forEach((matiere) => {
                    matiere.domaines.forEach((domaine) => {
                        // Filtrer les items pour cette période et ce domaine
                        const items = domaine.items.filter((item) => item.periodeId === periode.id);
                        row.domaines[domaine.name] = items;
                    });
                });
        
                return row;
            });
        
            return rows;
        } else {
            return [];
        }
    }


    if (rows.length === 0) {
        return <div>Chargement...</div>;
    }

    const domaines = programmation?.matieres.flatMap((matiere) => matiere.domaines.map((domaine) => domaine.name));

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {domaines?.map((domaine) => (
                        <th key={domaine}>{domaine}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.periode.id}>
                        <td className={`bg-${row.periode.color} `}>{row.periode.name}</td>
                        {domaines?.map((domaine) => (
                            <td key={domaine}>
                                {row.domaines[domaine]?.map((item) => (
                                    <div key={item.id} dangerouslySetInnerHTML={{ __html: item.value }} />
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProgrammationTable;