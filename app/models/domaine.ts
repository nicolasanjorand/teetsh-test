import type { Item } from "./item";

export interface Domaine {
    id: string,
    name: string,
    color: string,
    items: [Item],
    position: number,
    matiereId: string,
    programmationId: string,
}