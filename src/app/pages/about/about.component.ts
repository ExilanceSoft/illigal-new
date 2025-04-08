import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
// import { SwiperModule } from 'swiper/angular';



@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Maria Rodriguez',
      position: 'Executive Director',
      bio: 'Environmental scientist with 15 years of experience in waste management policy.',
      image: 'assets/images/team/maria.jpg',
      social: [
        { icon: 'linkedin', link: '#' },
        { icon: 'twitter', link: '#' }
      ]
    },
    {
      name: 'James Wilson',
      position: 'Technology Lead',
      bio: 'Software engineer passionate about building tools for environmental protection.',
      image: 'assets/images/team/james.jpg',
      social: [
        { icon: 'linkedin', link: '#' },
        { icon: 'github', link: '#' }
      ]
    },
    {
      name: 'Sarah Chen',
      position: 'Community Outreach',
      bio: 'Organizer and activist with a focus on environmental justice in urban communities.',
      image: 'assets/images/team/sarah.jpg',
      social: [
        { icon: 'facebook', link: '#' },
        { icon: 'instagram', link: '#' }
      ]
    }
  ];

  partners = [
    { name: 'EPA', logo: 'assets/images/partners/epa.png' },
    { name: 'National Wildlife Federation', logo: 'assets/images/partners/nwf.png' },
    { name: 'Keep America Beautiful', logo: 'assets/images/partners/kab.png' },
    { name: 'Texas Environmental Agency', logo: 'assets/images/partners/tea.png' },
    { name: 'Sierra Club', logo: 'assets/images/partners/sierra.png' },
    { name: 'Greenpeace', logo: 'assets/images/partners/greenpeace.png' }
  ];

  values = [
    {
      icon: 'public',
      title: 'Environmental Stewardship',
      description: 'We believe in protecting our natural resources for future generations.'
    },
    {
      icon: 'groups',
      title: 'Community Empowerment',
      description: 'We equip communities with tools to take action against illegal dumping.'
    },
    {
      icon: 'gavel',
      title: 'Accountability',
      description: 'We work to hold polluters responsible for their actions.'
    },
    {
      icon: 'science',
      title: 'Innovation',
      description: 'We leverage technology to create effective solutions to environmental problems.'
    }
  ];

  testimonials = [
    {
      name: 'Carlos Mendez',
      position: 'Community Organizer, Houston',
      text: 'This initiative has transformed our neighborhood. Where we used to see piles of trash, we now have clean spaces where children can play safely.',
      image: 'assets/images/testimonials/carlos.jpg'
    },
    {
      name: 'Lisa Johnson',
      position: 'City Council Member, Austin',
      text: 'The reporting tools developed by this team have helped our city identify and address illegal dumping hotspots more effectively than ever before.',
      image: 'assets/images/testimonials/lisa.jpg'
    },
    {
      name: 'David Kim',
      position: 'Environmental Scientist',
      text: 'The data collected through this platform is invaluable for understanding patterns of illegal dumping and developing targeted prevention strategies.',
      image: 'assets/images/testimonials/david.jpg'
    }
  ];
}