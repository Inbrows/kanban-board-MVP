import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets = [
    { id: 1, title: 'Сделать дизайн', column: 'To Do' },
    { id: 2, title: 'Написать код', column: 'In Progress' },
    { id: 3, title: 'Протестировать', column: 'Done' }
  ];

  constructor() {}

  getTickets() {
    return this.tickets;
  }

  addTicket(title: string, column: string) {
    const newTicket = { id: Date.now(), title, column };
    this.tickets.push(newTicket);
  }

  deleteTicket(id: number) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== id);
  }
}
