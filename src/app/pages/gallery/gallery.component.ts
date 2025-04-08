import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TitleCasePipe, DatePipe } from '@angular/common';

interface GalleryItem {
  image: string;
  title: string;
  description: string;
  date: Date;
  type: 'before' | 'after' | 'events' | 'volunteers';
  wide?: boolean;
  tall?: boolean;
}

@Component({
  standalone: true,
  imports: [
    MatIcon,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    TitleCasePipe,
    DatePipe
  ],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  filter = 'all';
  
  galleryItems: GalleryItem[] = [
    {
      image: 'assets/images/event1.jpg',
      title: 'Community Park Cleanup',
      description: 'Volunteers removing trash from local park',
      date: new Date('2023-05-15'),
      type: 'events'
    },
    {
      image: 'assets/images/event2.jpg',
      title: 'Illegal Dumping Site',
      description: 'Abandoned furniture and trash in residential area',
      date: new Date('2023-04-10'),
      type: 'before',
      wide: true
    },
    {
      image: 'assets/images/event3.jpg',
      title: 'Cleaned Dumping Site',
      description: 'Same location after community cleanup',
      date: new Date('2023-04-12'),
      type: 'after',
      wide: true
    },
    {
      image: 'assets/images/event4.jpg',
      title: 'Team of Volunteers',
      description: 'Dedicated community members working together',
      date: new Date('2023-06-20'),
      type: 'volunteers',
      tall: true
    },
    {
      image: 'assets/images/event5.jpg',
      title: 'School Cleanup Day',
      description: 'Students participating in environmental education',
      date: new Date('2023-03-05'),
      type: 'events'
    },
    {
      image: 'assets/images/event6.jpg',
      title: 'Alleyway Dumping',
      description: 'Chronic dumping site behind local businesses',
      date: new Date('2023-02-18'),
      type: 'before'
    },
    {
      image: 'assets/images/n1.jpg',
      title: 'Restored Alleyway',
      description: 'After installation of cameras and cleanup',
      date: new Date('2023-02-22'),
      type: 'after'
    },
    {
      image: 'assets/images/n2.jpg',
      title: 'Youth Volunteers',
      description: 'Young people making a difference',
      date: new Date('2023-07-10'),
      type: 'volunteers'
    }
  ];

  get filteredItems(): GalleryItem[] {
    if (this.filter === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.type === this.filter);
  }

  loadMore() {
    // In a real app, you would load more items from an API
    // For demo, we'll just duplicate existing items
    const newItems = [...this.galleryItems];
    this.galleryItems = [...this.galleryItems, ...newItems];
  }
}