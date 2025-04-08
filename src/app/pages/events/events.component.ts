import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  image: string;
  participants: number;
  status: 'upcoming' | 'ongoing';
  organizer: string;
  contact: string;
  requirements?: string;
}

interface PastEvent extends Event {
  bagsCollected: number;
  weight: number;
  photos?: string[];
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  selectedLocation: string = 'all';
  locations: string[] = ['All Locations', 'Downtown', 'Riverside', 'Green Valley', 'Westside', 'North Park'];
  
  events: Event[] = [
    {
      id: 1,
      title: 'Riverside Cleanup Day',
      description: 'Join us for a community cleanup along the beautiful Riverside park area. We\'ll provide all necessary equipment.',
      location: 'Riverside',
      date: new Date(2023, 10, 15),
      time: '9:00 AM - 12:00 PM',
      image: 'assets/images/event1.jpg',
      participants: 42,
      status: 'upcoming',
      organizer: 'Green Earth Initiative',
      contact: 'riverside@clean.com',
      requirements: 'Wear comfortable clothes and closed-toe shoes'
    },
    {
      id: 2,
      title: 'Downtown Illegal Dumping Removal',
      description: 'Help remove illegally dumped waste from downtown alleys and vacant lots. Safety gear provided.',
      location: 'Downtown',
      date: new Date(2023, 10, 22),
      time: '8:00 AM - 2:00 PM',
      image: 'assets/images/event2.jpg',
      participants: 78,
      status: 'ongoing',
      organizer: 'Urban Clean Coalition',
      contact: 'downtown@clean.com'
    },
    {
      id: 3,
      title: 'Westside Neighborhood Cleanup',
      description: 'Annual neighborhood cleanup event with prizes for most waste collected!',
      location: 'Westside',
      date: new Date(2023, 11, 5),
      time: '10:00 AM - 1:00 PM',
      image: 'assets/images/event3.jpg',
      participants: 35,
      status: 'upcoming',
      organizer: 'Westside Community Board',
      contact: 'westside@clean.com'
    },
    {
      id: 4,
      title: 'Green Valley Park Restoration',
      description: 'Help clean and restore our beloved Green Valley Park after recent illegal dumping incidents.',
      location: 'Green Valley',
      date: new Date(2023, 11, 12),
      time: '8:30 AM - 11:30 AM',
      image: 'assets/images/event4.jpg',
      participants: 28,
      status: 'upcoming',
      organizer: 'Friends of Green Valley',
      contact: 'greenvalley@clean.com'
    },
    {
      id: 5,
      title: 'North Park Recycling Drive',
      description: 'Community recycling event with proper disposal of electronics and hazardous materials.',
      location: 'North Park',
      date: new Date(2023, 11, 18),
      time: '9:00 AM - 3:00 PM',
      image: 'assets/images/event5.jpg',
      participants: 56,
      status: 'upcoming',
      organizer: 'North Park Environmental Group',
      contact: 'northpark@clean.com'
    },
    {
      id: 6,
      title: 'Downtown Alley Cleanup',
      description: 'Focus on cleaning up dumped waste in downtown alleyways that attract pests.',
      location: 'Downtown',
      date: new Date(2023, 11, 20),
      time: '7:30 AM - 12:30 PM',
      image: 'assets/images/event6.jpg',
      participants: 64,
      status: 'upcoming',
      organizer: 'Downtown Business Alliance',
      contact: 'dba@clean.com'
    }
  ];

  pastEvents: PastEvent[] = [
    {
      id: 101,
      title: 'Spring Community Cleanup',
      description: 'Annual spring cleanup event that covered 5 neighborhoods',
      location: 'Various',
      date: new Date(2023, 4, 15),
      time: 'Completed',
      image: 'assets/images/past-event1.jpg',
      participants: 215,
      status: 'upcoming',
      organizer: 'City Environmental Dept',
      contact: 'city@clean.com',
      bagsCollected: 320,
      weight: 4200,
      photos: ['photo1.jpg', 'photo2.jpg']
    },
    {
      id: 102,
      title: 'Riverside Waste Removal',
      description: 'Focused cleanup of illegal dumping along the river',
      location: 'Riverside',
      date: new Date(2023, 6, 22),
      time: 'Completed',
      image: 'assets/images/past-event2.jpg',
      participants: 87,
      status: 'upcoming',
      organizer: 'River Protection Society',
      contact: 'river@clean.com',
      bagsCollected: 145,
      weight: 1800
    },
    {
      id: 103,
      title: 'Industrial Area Cleanup',
      description: 'Removal of construction debris dumped illegally',
      location: 'Westside',
      date: new Date(2023, 8, 10),
      time: 'Completed',
      image: 'assets/images/past-event3.jpg',
      participants: 45,
      status: 'upcoming',
      organizer: 'Westside Business Council',
      contact: 'wbc@clean.com',
      bagsCollected: 95,
      weight: 3200
    }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Sort events by date (soonest first)
    this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Sort past events by date (most recent first)
    this.pastEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  get filteredEvents(): Event[] {
    if (this.selectedLocation === 'all') {
      return this.events;
    }
    return this.events.filter(event => 
      event.location.toLowerCase() === this.selectedLocation.toLowerCase()
    );
  }

  openEventDialog(event: Event): void {
    this.dialog.open(EventDialogComponent, {
      width: '600px',
      data: event
    });
  }

  joinEvent(eventId: number): void {
    // In a real app, this would connect to a backend service
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.participants++;
      // Show confirmation
      alert(`Thank you for joining ${event.title}! Details have been sent to your email.`);
    }
  }
}