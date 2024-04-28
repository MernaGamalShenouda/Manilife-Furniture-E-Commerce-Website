import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSharingService } from '../../Services/data-sharing.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    DataSharingService
  ],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnInit{
  @Input() Product:any;
  
  constructor(public dialog: MatDialog) {}
  

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
  viewDetails:string ='';

  viewdetails(): void {
    this.viewDetails="Product got viewed";
    DataSharingService.updateviewdetails(this.viewDetails);
  }

  openDialogUpdate(productId: string) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: {
        productId: productId
      }
    });
console.log(productId)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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