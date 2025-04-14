// chatbot.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ChatbotService } from '../../services/chatbot.service';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSpinner,
    ReactiveFormsModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  chatForm: FormGroup;
  messages: { text: string, isUser: boolean }[] = [];
  isLoading = false;
  constructor(
    private chatbotService: ChatbotService,
    private fb: FormBuilder
  ) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Initial greeting from the bot
    this.messages.push({
      text: "Hello! I'm DumpBot. How can I help you with illegal dumping or waste management questions today?",
      isUser: false
    });
  }
  sendMessage(): void {
    if (this.chatForm.valid) {
      const userMessage = this.chatForm.value.message;
      this.messages.push({ text: userMessage, isUser: true });
      this.chatForm.reset();
      this.isLoading = true;

      this.chatbotService.askQuestion(userMessage).subscribe({
        next: (response: { answer: any; }) => {
          this.messages.push({ text: response.answer, isUser: false });
          this.isLoading = false;
        },
        error: (error: any) => {
          this.messages.push({ 
            text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
            isUser: false 
          });
          this.isLoading = false;
          console.error('Chatbot error:', error);
        }
      });
    }
  }
}