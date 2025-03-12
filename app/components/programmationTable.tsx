import { useState, useEffect } from "react";
import type { Item, Periode, Programmation, Domaine } from "../models";
import Badge from "./ui/badge";
import { formatDate } from "~/lib/format";

const ProgrammationTable: React.FC<{ programmation: Programmation | null }> = ({ programmation }) => {

    const [rowsPeriod, setRowsPeriod] = useState<{ periode: Periode; domaines: { [key: string]: Item[] } }[]>([]);
    const [rowsDomains, setRowsDomains] = useState<{ domaine: Domaine; periodes: { [key: string]: Item[] } }[]>([]);
    const [tableDirection, setTableDirection] = useState<string>('period');

    useEffect(() => {
        processData(tableDirection);
    }, [programmation]);

    const processData = (direction: string) => {
        console.log(direction)
        if(direction == 'period') {
            const organizedData = organizeDataForTablePeriod(programmation);
            setRowsPeriod(organizedData);
        } else {
            const organizedData = organizeDataForTableDomain(programmation);
            setRowsDomains(organizedData);
        }
    }

    function organizeDataForTableDomain(programmationParameter: Programmation | null) {
        if(programmationParameter?.periodes && programmationParameter.matieres) {
            const { periodes, matieres } = programmationParameter;
        
            // Créer un tableau pour les lignes (domaines)
            const rows = matieres.flatMap((matiere) =>
                matiere.domaines.map((domaine) => {
                    // Créer un objet pour chaque domaine
                    const row: { domaine: Domaine; periodes: { [key: string]: Item[] } } = {
                        domaine,
                        periodes: {},
                    };
        
                    // Remplir les colonnes (périodes) pour ce domaine
                    periodes.forEach((periode) => {
                        // Filtrer les items pour cette période et ce domaine
                        const items = domaine.items.filter((item) => item.periodeId === periode.id);
                        row.periodes[periode.name] = items;
                    });
        
                    return row;
                })
            );
        
            return rows;
        } else {
            return [];
        }
    }


    function organizeDataForTablePeriod(programmationParameter: Programmation | null) {
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


    
    if(tableDirection == 'period') {
        if (rowsPeriod.length === 0) {
            return <div>Chargement... period</div>;
        }
    
        const domaines = programmation?.matieres.flatMap((matiere) => matiere.domaines.map((domaine) => domaine.name));
    
        return (
            <div>
                <button onClick={() => {setTableDirection('domain'), processData('domain')}}>Inverser le tableau</button>
                <table className="">
                    <thead>
                        <tr>
                            <th className="w-[100px]"></th>
                            {domaines?.map((domaine) => (
                                <th key={domaine}>{domaine}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowsPeriod.map((row) => (
                            <tr key={row.periode.id}>
                                <td className="h-full flex flex-col justify-center items-center gap-2 w-[150px]">
                                    <Badge className={`border-2 border-${row.periode.color}`}>
                                        {row.periode.name}
                                    </Badge>
                                    <span className="text-gray-300 text-xs">
                                        {formatDate(row.periode.startDate)} - {formatDate(row.periode.endDate)}
                                    </span>
                                </td>
                                {domaines?.map((domaine) => (
                                    <td key={domaine} className="text-xs">
                                        {row.domaines[domaine]?.map((item) => (
                                            <div 
                                                className="flex flex-col gap-1"
                                                key={item.id} 
                                                dangerouslySetInnerHTML={{ __html: item.value }} 
                                            />
                                        ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        )
    } else {
        if (rowsDomains.length === 0) {
            return <div>Chargement... domain</div>;
        }
    
        const periodes = programmation?.periodes.map((periode) => periode.name);
    
        return (
            <div>
                <button onClick={() => {setTableDirection('period'), processData('period')}}>Inverser le tableau</button>
                <table className="">
                    <thead>
                        <tr>
                            <th className="w-[100px]"></th>
                            {periodes?.map((periode) => (
                            <th key={periode}>{periode}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                    {rowsDomains.map((row) => (
                        <tr key={row.domaine.id}>
                            <td>{row.domaine.name}</td>
                            {periodes?.map((periode) => (
                                <td key={periode}>
                                    {row.periodes[periode]?.map((item) => (
                                        <div key={item.id} dangerouslySetInnerHTML={{ __html: item.value }} />
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
        )
    }


    
}

export default ProgrammationTable;