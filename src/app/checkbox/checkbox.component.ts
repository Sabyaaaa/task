// checkbox.component.ts

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {
  showSubscribeMessage = false;
  hasScrolledDown = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
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

    if (window.scrollY > (checkboxPosition?.top || 0)) {
      this.hasScrolledDown = true;
    }

    if (
      this.hasScrolledDown &&
      checkboxPosition &&
      checkboxPosition.top >= 0 &&
      checkboxPosition.bottom <= window.innerHeight
    ) {
      this.showSubscribeMessage = !this.isCheckboxChecked();
    } else {
      this.showSubscribeMessage = false;
    }
  }

  private isCheckboxChecked(): boolean {
    const checkboxElement = document.getElementById(
      'check-pos'
    ) as HTMLInputElement;
    return checkboxElement ? checkboxElement.checked : false;
  }
}
