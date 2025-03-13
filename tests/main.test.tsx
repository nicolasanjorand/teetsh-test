import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Programmation, Periode, Item, Domaine, Matiere } from '~/models';
import ProgrammationTable from '../app/components/programmationTable';

describe('ProgrammationTable', () => {
  const periode: Periode = {
    id: "2fb02f7c-be9f-46f8-8ad8-902921a8ff73",
    name: "Période 1",
    color: "lime-200",
    endDate: "2021-10-23T00:00:00Z",
    position: 1,
    startDate: "2021-09-02T00:00:00Z",
    programmationId: "1c6ecce2-968d-47fc-8b73-14f13d58779a"
  }

  const item: Item = {
    y: 0,
    id: "6101de57-65c6-4669-a205-d9bd67a5d47d",
    value: "<p><strong style=\"color: rgb(14, 165, 233);\">Nombres jusqu&#39;à 59</strong></p><ul><li>Lire &amp; écrire les nombres jusqu&#39;à 59</li><li>Identifier les unités et les dizaines d&#39;un nombre</li><li>Compter de 1 en 1 en avant et en arrière</li><li>Dénombrer de petites collections</li></ul>",
    width: 1,
    height: 8,
    Sequence: null,
    domaineId: "6bcac154-ea35-455c-a29b-1a29ff68601b",
    periodeId: "2fb02f7c-be9f-46f8-8ad8-902921a8ff73",
    FicheDePrep: null,
    attachments: []
  }

  const domaine: Domaine = {
    id: "6bcac154-ea35-455c-a29b-1a29ff68601b",
    name: "Nombres",
    color: "blue-200",
    items: [
      item
    ],
    position: 0,
    programmationId: "1c6ecce2-968d-47fc-8b73-14f13d58779a",
    matiereId: "aace495f-be41-4c5e-86ec-0f15c8ecae9e",
  }

  const matiere: Matiere = {
    id: "aace495f-be41-4c5e-86ec-0f15c8ecae9e",
    name: "Mathématiques",
    color: "white",
    domaines: [
      domaine
    ],
    position: 0,
    programmationId: "1c6ecce2-968d-47fc-8b73-14f13d58779a"
  }
  const mockProgrammation: Programmation = {
    name: "Programmation de Mathématiques par période pour CE1",
    shortDescription: "Voici un exemple de programmation de mathématiques pour une classe simple de CE1. Elle est conforme aux programmes en vigueur et peut être mise en place quel que soit le manuel choisi.",
    date: "2023-03-14",
    userId: "c1293f59-ce7f-4253-a372-399f81b06700",
    nbOfUseLanding: 222,
    nbOfUseInApp: 4506,
    schoolyearId: "33212705-1ac9-451e-8c52-43579092c677",
    schoolId: "a9e22e1f-3bb1-4119-b72c-5316eeafb232",
    programmationId: "1c6ecce2-968d-47fc-8b73-14f13d58779a",
    periodes: [
      periode
    ],
    matieres: [
      matiere
    ],
    columnWidth: 0,
    fontSize: "",
    view: "periode",
    invertedRowCol: true,
    niveau: "CE1",
    createdAt: "2023-04-03T15:05:56.296Z",
    updatedAt: "2025-03-12T14:20:43.301Z",
    publishedAt: "2024-05-31T15:18:26.186Z",
    onePageMatiere: null,
    slug: "programmation-mathematiques-periode-ce1"
};


  it('renders loading state when no programmation is provided', () => {
    render(<ProgrammationTable programmation={null} tableDirection="periodes" />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('renders thead with correct domaines when programmation is provided and direction is periodes', () => {
    render(<ProgrammationTable programmation={mockProgrammation} tableDirection="periodes" />);
    expect(screen.getByText('Nombres')).toBeInTheDocument();
    const domaineHeader = screen.getByText('Nombres').closest('th');
    expect(domaineHeader).toHaveClass('bg-blue-200'); 
  });

  it('renders table with correct periods when programmation is provided and direction is periodes', () => {
    render(<ProgrammationTable programmation={mockProgrammation} tableDirection="periodes" />);
    expect(screen.getByText('Période 1')).toBeInTheDocument();
    const domaineHeader = screen.getByText('Période 1').closest('span');
    expect(domaineHeader).toHaveClass('border-lime-200'); 
  });

  it('renders thead with correct domaines when programmation is provided and direction is domaines', () => {
    render(<ProgrammationTable programmation={mockProgrammation} tableDirection="domaines" />);
    expect(screen.getByText('Nombres')).toBeInTheDocument();
    const domaineHeader = screen.getByText('Nombres').closest('td');
    expect(domaineHeader).toHaveClass('bg-blue-200'); 
  });

  it('renders table with correct periods when programmation is provided and direction is domaines', () => {
    render(<ProgrammationTable programmation={mockProgrammation} tableDirection="domaines" />);
    expect(screen.getByText('Période 1')).toBeInTheDocument();
    const domaineHeader = screen.getByText('Période 1').closest('span');
    expect(domaineHeader).toHaveClass('border-lime-200'); 
  });

  it('renders table data in the correct positions', () => {
    render(<ProgrammationTable programmation={mockProgrammation} tableDirection="periodes" />);
    expect(screen.getByText('Période 1')).toBeInTheDocument();
    const periodeCell = screen.getByText('Période 1').closest('td');
    const item1Cell = screen.getByTestId(domaine.id).closest('td');
    expect(item1Cell).toBeInTheDocument();
    expect(item1Cell?.previousElementSibling).toBe(periodeCell);

  });

});