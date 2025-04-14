import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CountUpModule } from 'ngx-countup';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    RouterModule, 
    MatIconModule,
    CountUpModule,
    MatExpansionModule,
    ChatbotComponent

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('chatbotDialog') chatbotDialog!: ElementRef<HTMLDialogElement>;

  stats = [
    { value: 1240, label: 'Reports Filed', current: 0, icon: 'description' },
    { value: 85, label: 'Cleanup Events', current: 0, icon: 'groups' },
    { value: 32, label: 'Active Communities', current: 0, icon: 'location_city' }
  ];
  openChatbot(): void {
    this.chatbotDialog.nativeElement.showModal();
  }

  closeChatbot(): void {
    this.chatbotDialog.nativeElement.close();
  }
  features = [
    {
      icon: 'report',
      title: 'Report Dumping',
      description: 'Easily report illegal dumping activities with photos and location'
    },
    {
      icon: 'event',
      title: 'Join Events',
      description: 'Participate in community cleanup events near you'
    },
    {
      icon: 'track_changes',
      title: 'Track Progress',
      description: 'See the impact of your reports and community efforts'
    }
  ];

  ngOnInit() {
    this.animateCounters();
  }

  animateCounters() {
    this.stats.forEach(stat => {
      this.animateValue(stat, stat.value, 2000);
    });
  }

  animateValue(stat: any, end: number, duration: number) {
    const start = 0;
    const increment = end / (duration / 16); // 60fps
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      stat.current = Math.floor(current);
      if (current >= end) {
        stat.current = end;
        clearInterval(timer);
      }
    }, 16);
  }
}