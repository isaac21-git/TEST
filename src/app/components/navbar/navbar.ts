import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideHouse, LucideMenu, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [LucideHouse,LucideMenu,LucideX],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() menuOpen = false;
  @Output() menuToggled = new EventEmitter<boolean>();
}