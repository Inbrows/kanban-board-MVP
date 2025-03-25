import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TelegramService } from 'src/app/services/telegram.service';

interface Ticket {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  files: File[];
  assignee: number | null;
}

interface Column {
  name: string;
  tickets: Ticket[];
}

interface Assignee {
  id: number;
  name: string;
  telegramId: string;
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  templateUrl: './kanban-board.page.html',
  styleUrls: ['./kanban-board.page.scss'],
})
export class KanbanBoardPage {
  columns: Column[] = [
    {
      name: 'To Do',
      tickets: [
        {
          id: 1,
          title: 'Проверить задачу',
          description: '',
          tags: [],
          link: '',
          files: [],
          assignee: null
        }
      ]
    },
    { name: 'In Progress', tickets: [] },
    { name: 'Done', tickets: [] }
  ];

  assignees: Assignee[] = [
    { id: 1, name: 'Алексей', telegramId: '123456789' },
    { id: 2, name: 'Мария', telegramId: '357289590' },
    { id: 3, name: 'Дмитрий', telegramId: '933160179' },
    { id: 4, name: 'Анна', telegramId: '112233445' }
  ];

  ticketColumnMap: { [ticketId: number]: string } = {};
  draggedTicket: Ticket | null = null;
  draggedColumnIndex: number | null = null;
  mobileDraggedTicket: Ticket | null = null;
  mobileDraggedColumn: Column | null = null;
  searchQuery: string = '';

  constructor(private telegramService: TelegramService) {
    // Инициализация ticketColumnMap для уже созданных тикетов
    this.columns.forEach(column => {
      column.tickets.forEach(ticket => {
        this.ticketColumnMap[ticket.id] = column.name;
      });
    });
  }

  addColumn() {
    this.columns.push({ name: 'Новая доска', tickets: [] });
  }

  deleteColumn(column: Column) {
    if (column.tickets.length > 0) {
      alert('Нельзя удалить доску с тикетами');
      return;
    }
    this.columns = this.columns.filter(c => c !== column);
  }

  updateColumnName(column: Column) {
    column.name = column.name.trim();
  }

  addTicket(column: Column) {
    const newTicket: Ticket = {
      id: Date.now(),
      title: 'Новый тикет',
      description: '',
      tags: [],
      link: '',
      files: [],
      assignee: null
    };
    column.tickets.push(newTicket);
    this.ticketColumnMap[newTicket.id] = column.name;
  }

  deleteTicket(ticket: Ticket) {
    this.columns.forEach(c => {
      c.tickets = c.tickets.filter(t => t.id !== ticket.id);
    });
    delete this.ticketColumnMap[ticket.id];
  }

  duplicateTicket(ticket: Ticket) {
    const copy: Ticket = {
      ...ticket,
      id: Date.now(),
      title: ticket.title + ' (копия)',
      files: [...ticket.files]
    };
    this.columns.forEach(c => {
      if (c.tickets.includes(ticket)) {
        c.tickets.push(copy);
        this.ticketColumnMap[copy.id] = c.name;
      }
    });
  }

  updateTicket(ticket: Ticket) {
    ticket.title = ticket.title.trim();
    this.sendTelegramNotification(ticket);
  }

  moveTicket(ticket: Ticket) {
    const targetColumn = this.columns.find(c => c.name === this.ticketColumnMap[ticket.id]);
    if (targetColumn) {
      this.columns.forEach(c => {
        c.tickets = c.tickets.filter(t => t.id !== ticket.id);
      });
      targetColumn.tickets.push(ticket);
      this.sendTelegramNotification(ticket);
    }
  }

  onFileSelected(event: Event, ticket: Ticket) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      ticket.files.push(...Array.from(input.files));
      this.sendTelegramNotification(ticket);
    }
  }

  sendTelegramNotification(ticket: Ticket) {
    const assigneeId = Number(ticket.assignee);
    const assignee = this.assignees.find(a => a.id === assigneeId);
    if (!assignee || !assignee.telegramId) return;
  
    const column = this.ticketColumnMap[ticket.id] || this.getColumnNameByTicket(ticket);
    const fileAttached = ticket.files.length > 0;
  
    // Преобразуем теги в массив, если это строка (на случай, если пользователь ввёл строку)
    const rawTags = Array.isArray(ticket.tags) ? ticket.tags : (ticket.tags ? String(ticket.tags).split(',') : []);
    const cleanedTags = rawTags.map(tag => tag.trim()).filter(tag => tag !== '');
    const tagsText = cleanedTags.length > 0 ? cleanedTags.join(', ') : 'Не указаны';
  
    const message = `
  <b>🔔 Обновление тикета</b>
  <b>📝 ${ticket.title}</b>
  📋 ${ticket.description || 'Описание не указано'}
  🔗 ${ticket.link || 'Ссылка не указана'}
  📦 Доска: ${column}
  👤 Исполнитель: ${assignee.name}
  🏷️ Теги: ${tagsText}
  ${fileAttached ? '📎 Файл прикреплён' : ''}
  `.trim();
  
    if (fileAttached) {
      this.telegramService.sendWithFile(assignee.telegramId, message, ticket.files[0]);
    } else {
      this.telegramService.send(assignee.telegramId, message);
    }
  }

  getColumnNameByTicket(ticket: Ticket): string {
    for (const col of this.columns) {
      if (col.tickets.includes(ticket)) {
        return col.name;
      }
    }
    return 'Неизвестно';
  }

  onTicketDragStart(event: DragEvent, ticket: Ticket, column: Column) {
    this.draggedTicket = ticket;
    event.stopPropagation();
  }

  onTicketDrop(event: DragEvent, targetColumn: Column) {
    event.preventDefault();
    if (this.draggedTicket) {
      this.columns.forEach(c => {
        c.tickets = c.tickets.filter(t => t.id !== this.draggedTicket!.id);
      });
      targetColumn.tickets.push(this.draggedTicket);
      this.ticketColumnMap[this.draggedTicket.id] = targetColumn.name;
      this.sendTelegramNotification(this.draggedTicket);
      this.draggedTicket = null;
    }
  }

  onColumnDragOver(event: DragEvent) {
    event.preventDefault();
  }

  touchStartTicket(event: TouchEvent | MouseEvent, ticket: Ticket, column: Column) {
    this.mobileDraggedTicket = ticket;
    event.stopPropagation();
  }

  touchMove(event: TouchEvent) {
    event.preventDefault();
  }

  touchEndTicket(_: TouchEvent, __: Column) {}

  touchStartTicketSimulate(_: MouseEvent, ticket: Ticket, __: Column) {
    this.mobileDraggedTicket = ticket;
  }

  selectTicketToMove(ticket: Ticket) {
    this.mobileDraggedTicket = ticket;
  }

  onMobileDrop(column: Column) {
    if (this.mobileDraggedTicket) {
      this.columns.forEach(c => {
        c.tickets = c.tickets.filter(t => t.id !== this.mobileDraggedTicket!.id);
      });
      column.tickets.push(this.mobileDraggedTicket);
      this.ticketColumnMap[this.mobileDraggedTicket.id] = column.name;
      this.sendTelegramNotification(this.mobileDraggedTicket);
      this.mobileDraggedTicket = null;
    }

    if (this.mobileDraggedColumn) {
      this.moveColumnToTarget(column);
      this.mobileDraggedColumn = null;
    }
  }

  onColumnDragStart(event: DragEvent, index: number) {
    this.draggedColumnIndex = index;
  }

  onColumnDrop(event: DragEvent, targetIndex: number) {
    event.preventDefault();
    if (this.draggedColumnIndex !== null && this.draggedColumnIndex !== targetIndex) {
      const moved = this.columns.splice(this.draggedColumnIndex, 1)[0];
      this.columns.splice(targetIndex, 0, moved);
      this.draggedColumnIndex = null;
    }
  }

  touchStartColumn(_: TouchEvent, column: Column, __: number) {
    this.mobileDraggedColumn = column;
  }

  touchEndColumn(_: TouchEvent, __: Column, ___: number) {}

  selectColumnToMove(column: Column) {
    this.mobileDraggedColumn = column;
  }

  moveColumnToTarget(targetColumn: Column) {
    const fromIndex = this.columns.indexOf(this.mobileDraggedColumn!);
    const toIndex = this.columns.indexOf(targetColumn);
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const moved = this.columns.splice(fromIndex, 1)[0];
      this.columns.splice(toIndex, 0, moved);
    }
  }

  getFilteredTickets(column: Column): Ticket[] {
    const query = this.searchQuery.toLowerCase();
    return column.tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.link.toLowerCase().includes(query) ||
      ticket.tags.some(tag => tag.toLowerCase().includes(query)) ||
      this.getAssigneeName(ticket.assignee).toLowerCase().includes(query)
    );
  }

  getAssigneeName(assigneeId: number | null): string {
    const assignee = this.assignees.find(a => a.id === assigneeId);
    return assignee ? assignee.name : '';
  }
}
