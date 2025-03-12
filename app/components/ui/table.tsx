interface TableProps {
    rows: { [key: string]: any }[];
    headers: string[];
    renderHeader: (header: string) => React.ReactNode;
    renderRow: (row: any, headers: string[]) => React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ rows, headers, renderHeader, renderRow }) => {
    return (
        <table className="">
            <thead>
                <tr>
                    <th className="w-[100px]"></th>
                    {headers.map((header) => renderHeader(header))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => renderRow(row, headers))}
            </tbody>
        </table>
    );
};