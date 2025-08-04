import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [ThemeToggle],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  encapsulation: ViewEncapsulation.None
})
export class ThemeToggle {
  isDark = false;
  
  toggle() {
    this.isDark = !this.isDark;
  }
}
