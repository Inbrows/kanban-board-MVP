import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'kanban-board', pathMatch: 'full' }, //  Делаем Kanban-доску главной страницей
  { path: 'kanban-board', loadComponent: () => import('./pages/kanban-board/kanban-board.page').then(m => m.KanbanBoardPage) },
  { path: 'ticket', loadComponent: () => import('./pages/ticket/ticket.page').then(m => m.TicketPage) },
];
