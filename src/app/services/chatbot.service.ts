// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8000/ask'; 

  constructor(private http: HttpClient) { }

  askQuestion(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { message });
  }
}