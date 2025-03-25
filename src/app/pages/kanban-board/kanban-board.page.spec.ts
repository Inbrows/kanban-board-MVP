import { KanbanBoardPage } from './kanban-board.page';
import { TelegramService } from 'src/app/services/telegram.service';

describe('KanbanBoardPage', () => {
  let component: KanbanBoardPage;
  let telegramServiceMock: jasmine.SpyObj<TelegramService>;

  beforeEach(() => {
    telegramServiceMock = jasmine.createSpyObj('TelegramService', ['send', 'sendWithFile']);
    component = new KanbanBoardPage(telegramServiceMock);
  });

  it('должен добавлять тикет в колонку', () => {
    const column = component.columns[0];
    const initialLength = column.tickets.length;
    component.addTicket(column);
    expect(column.tickets.length).toBe(initialLength + 1);
  });

  it('должен удалять тикет из колонки', () => {
    const column = component.columns[0];
    const ticket = column.tickets[0];
    component.deleteTicket(ticket);
    expect(column.tickets.includes(ticket)).toBeFalse();
  });

  it('должен перемещать тикет в другую колонку', () => {
    const sourceColumn = component.columns[0];
    const targetColumn = component.columns[1];
    const ticket = sourceColumn.tickets[0];
    component.ticketColumnMap[ticket.id] = targetColumn.name;
    component.moveTicket(ticket);
    expect(targetColumn.tickets.includes(ticket)).toBeTrue();
  });

  it('должен вызывать TelegramService.send при обновлении тикета', () => {
    const ticket = component.columns[0].tickets[0];
    ticket.assignee = 3;
    component.updateTicket(ticket);
    expect(telegramServiceMock.send).toHaveBeenCalled();
  });

  it('должен вызывать TelegramService.sendWithFile при наличии файла', () => {
    const ticket = component.columns[0].tickets[0];
    const file = new File([''], 'test.txt');
    ticket.files.push(file);
    ticket.assignee = 3;
    component.updateTicket(ticket);
    expect(telegramServiceMock.sendWithFile).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String), file);
  });
});
