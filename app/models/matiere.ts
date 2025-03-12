import type { Domaine } from "./domaine";

export interface Matiere {
    id: string,
    name: string,
    color: string,
    domaines: [Domaine],
    position: number,
    programmationId: string,
}