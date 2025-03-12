import type { Matiere } from './matiere'
import type { Periode } from './periode'

export interface Programmation {
    columnWidth: number,
    fontSize: string,
    view: string,
    invertedRowCol: boolean,
    niveau: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    onePageMatiere: null,
    slug: string,
    name: string,
    shortDescription: string,
    date: string,
    userId: string,
    nbOfUseLanding: number,
    nbOfUseInApp: number,
    schoolyearId: string,
    schoolId: string,
    programmationId: string,
    periodes: [Periode],
    matieres: [Matiere],
}