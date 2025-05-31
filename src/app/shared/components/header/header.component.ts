import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule]
})
export class HeaderComponent {

  isHoveredLeft: boolean = false;
  isHoveredRight: boolean = false;

}
