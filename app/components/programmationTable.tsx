import { useState, useEffect, type JSX } from "react";
import type { Domaine, Item, Periode, Programmation } from "../models";
import Badge from "./ui/badge";
import { formatDate } from "../lib/format";

interface Header {
    id: string,
    name: string,
    cell: JSX.Element,
    color: string,
}

interface ProgrammationTableProps {
    programmation: Programmation | null;
    tableDirection: string;
  }

const ProgrammationTable: React.FC<ProgrammationTableProps> = ({ programmation, tableDirection }) => {    
    const [rows, setRows] = useState<any>([]);
    const [headers, setHeaders] = useState<Header[]>([]);
    const [activeColumn, setActiveColumn] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                    color: domaine.color,
                    cell: <th key={domaine.id} className={`p-3 bg-${domaine.color}`}>{domaine.name}</th>,
                }))
            );
        } else {
            return (programmation?.periodes || []).map((periode) => ({
                id: periode.id,
                name: periode.name,
                color: periode.color,
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
                buttonCell: (
                    <Badge className={`border-2 mt-3 border-${periode.color}`}>
                        {periode.name}
                    </Badge>
                )
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
                    <td key={periode.id} className="h-full flex flex-col justify-center items-center gap-2 text-xs md:text-sm  md:w-[150px] relative">
                        <div className={`w-full h-[20px] absolute top-0 bg-${periode.color}`}></div>
                        <span className="mt-3">{periode.name}</span>
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


    useEffect(() => {
        if (isMobile && headers.length > 0) {
            setActiveColumn(headers[0].id);
        }
    }, [isMobile, headers]);

    const visibleHeaders = isMobile ? headers.filter(header => header.id === activeColumn) : headers;



    if (rows.length === 0) {
        return <div>Chargement...</div>;
    }


    return (
        <div className="text-sm">
            {isMobile && (
                <div className="flex flex-wrap justify-center my-2 gap-2">
                    {headers.map(header => {
                        return (
                            <button 
                            key={header.id} 
                            onClick={() => setActiveColumn(header.id)} 
                            className={`rounded-md bg-${header.color} py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm cursor-pointer hover:font-bold ${activeColumn === header.id ? "font-bold scale-110" : "font-normal"} `}
                            //className={`px-3 py-1 rounded ${activeColumn === header.id ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        >
                            {header.name}
                        </button>
                        )
                    })}
                </div>
            )}
            <table>
            <thead>
                <tr>
                    <th></th>
                    {visibleHeaders.map((header) => header.cell)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: any, index: number) => (
                    <tr key={index}>
                        {row.firstCell()}
                        {visibleHeaders?.map((header: any) => (
                            <td data-testid={header.id} className="text-xs" key={header.id}>
                                {row.domaines[header.name]?.map((item: Item) => (
                                    <div className="" key={item.id} dangerouslySetInnerHTML={{ __html: item.value }} />
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

export default ProgrammationTable;