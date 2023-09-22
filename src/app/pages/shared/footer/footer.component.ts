import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DividerModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  positionDivide: string = 'vertical';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.positionDivide = window.innerWidth <= 575 ? 'horizontal' : 'vertical';
  }

}
