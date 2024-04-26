import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnInit{
  @Input() Product:any;

  ngOnInit(): void {
    this.assignCardColors();
  }
  
  assignCardColors() {
    const cardContainers = document.querySelectorAll('.card-container');
    const colors = ['#3f555a', '#afbdc0','#b4b1a1', '#086383'];
    const hoverColors = ['#5e8087', '#cad9dc', '#dad6c0', '#0786b5'];

    cardContainers.forEach((container: Element, index: number) => {
      const colorIndex = index % colors.length;
      const color = colors[colorIndex];
      (container as HTMLElement).style.backgroundColor = color;

      const hoverColorIndex = index % hoverColors.length;
      const hoverColor = hoverColors[hoverColorIndex];
      container.addEventListener('mouseenter', () => {
        (container as HTMLElement).style.backgroundColor = hoverColor;
      });

      container.addEventListener('mouseleave', () => {
        (container as HTMLElement).style.backgroundColor = color;
      });
    });
    
  }
  
    
}



// for (let i = colors.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [colors[i], colors[j]] = [colors[j], colors[i]];
    // }
  
    // cardContainers.forEach((container: Element, index: number) => {
    //   const randomColor = colors[index % colors.length];
    //   (container as HTMLElement).style.backgroundColor = randomColor;
    // });