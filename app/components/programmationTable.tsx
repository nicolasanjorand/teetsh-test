import { useState, useEffect, type JSX } from "react";
import type { Domaine, Item, Periode, Programmation } from "../models";
import Badge from "./ui/badge";
import { formatDate } from "~/lib/format";

interface Header {
    id: string,
    name: string,
    cell: JSX.Element
}

const ProgrammationTable: React.FC<{ programmation: Programmation | null, tableDirection: string }> = ({ programmation, tableDirection }) => {

    const [rows, setRows] = useState<any>([]);
    const [headers, setHeaders] = useState<Header[]>([]);

    useEffect(() => {
        setHeaders(organizeHeaders(programmation));
        setRows(organizeRows(programmation));
    }, [programmation, tableDirection]);


    function organizeHeaders(programmationParameter: Programmation | null) {
        if(!programmationParameter?.periodes || !programmationParameter.matieres) {
            return [];
        }
        const { matieres } = programmationParameter;

        if(tableDirection == 'periodes') {
            return matieres.flatMap(matiere =>
                matiere.domaines.map(domaine => ({
                    id: domaine.id,
                    name: domaine.name,
                    cell: <th className={`p-3 bg-${domaine.color}`}>{domaine.name}</th>,
                }))
            );
        } else {
            return (programmation?.periodes || []).map((periode) => ({
                id: periode.id,
                name: periode.name,
                cell: (
                    <th key={periode.id} className="">
                        <div className="relative h-[100px] flex flex-col justify-center items-center gap-2">
                            <div className={`w-full h-[10px] absolute top-0 bg-${periode.color}`}></div>
                            <Badge className={`border-2 mt-3 border-${periode.color}`}>
                                {periode.name}
                            </Badge>
                            <span className="text-gray-300 text-xs">
                                {formatDate(periode.startDate)} - {formatDate(periode.endDate)}
                            </span>
                        </div>
                    </th>
                ),
            }));
        }    
    }


    function organizeRows(programmationParameter: Programmation | null) {
        if(!programmationParameter?.periodes || !programmationParameter.matieres) {
            return [];
        }
        const { periodes, matieres } = programmationParameter;

        
        if(tableDirection == 'periodes') {
            return periodes.map((periode: Periode) => ({
                firstCell: () => (
                    <td className="h-full flex flex-col justify-center items-center gap-2 w-[150px] relative">
                        <div className={`w-full h-[20px] absolute top-0 bg-${periode.color}`}></div>
                        <Badge className={`border-2 mt-3 border-${periode.color}`}>
                            {periode.name}
                        </Badge>
                        <span className="text-gray-300 text-xs">
                            {formatDate(periode.startDate)} - {formatDate(periode.endDate)}
                        </span>
                    </td>
                ),
                domaines: Object.fromEntries(
                    matieres.flatMap(matiere =>
                        matiere.domaines.map(domaine => [domaine.name, domaine.items.filter(item => item.periodeId === periode.id)])
                    )
                ),
            }));
        } else {           
            return matieres.flatMap(matiere =>
                matiere.domaines.map(domaine => ({
                    firstCell: () => <td className={`bg-${domaine.color}`}>{domaine.name}</td>,
                    domaines: Object.fromEntries(
                        periodes.map(periode => [
                            periode.name,
                            domaine.items.filter(item => item.periodeId === periode.id),
                        ])
                    ),
                }))
            );
        }    
    }


    if (rows.length === 0) {
        return <div>Chargement...</div>;
    }


    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {headers?.map((header: Header) => (
                        header.cell
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: any) => (
                    <tr>
                        {row.firstCell()}
                        {headers?.map((header: any) => (
                            <td key={header.id}>
                                {row.domaines[header.name]?.map((item: Item) => (
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