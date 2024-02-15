// checkbox.component.ts

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {
  showSubscribeMessage = false;
  lastScrollY = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkScroll();
  }

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;

    if (!isChecked) {
      this.checkScroll();
    } else {
      this.showSubscribeMessage = false;
    }
  }

  private checkScroll() {
    const checkboxElement = document.getElementById(
      'check-pos'
    ) as HTMLInputElement;
    const checkboxPosition = checkboxElement
      ? checkboxElement.getBoundingClientRect()
      : null;

    const currentScrollY = window.scrollY;

    // Check if the user has fully encountered the entire checkbox section and continues to scroll down
    if (
      checkboxPosition &&
      checkboxPosition.top >= 0 &&
      checkboxPosition.bottom <= window.innerHeight &&
      currentScrollY > this.lastScrollY
    ) {
      this.showSubscribeMessage =
        currentScrollY > checkboxPosition.top + checkboxPosition.height;
    } else {
      this.showSubscribeMessage = false;
    }

    this.lastScrollY = currentScrollY;
  }
}
