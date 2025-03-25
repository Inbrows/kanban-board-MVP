// src/app/services/telegram.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private readonly token = '7876290676:AAF-EBUvZN3XPlSqOLNy8RZajpuNvrmby44';
  private readonly apiUrl = `https://api.telegram.org/bot${this.token}`;

  constructor(private http: HttpClient) {}

  send(chatId: string, text: string) {
    const url = `${this.apiUrl}/sendMessage`;
    return this.http
      .post(url, {
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      })
      .subscribe({
        next: () => console.log('Сообщение отправлено'),
        error: (error) => console.error('Ошибка отправки сообщения', error),
      });
  }

  sendWithFile(chatId: string, text: string, file: File) {
    const url = `${this.apiUrl}/sendDocument`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', text);
    formData.append('document', file);
    formData.append('parse_mode', 'HTML');

    this.http.post(url, formData).subscribe({
      next: () => console.log('Сообщение с файлом отправлено'),
      error: (err) => console.error('Ошибка при отправке файла:', err),
    });
  }
}
