import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges{  

  @Input() items : CartItem[] = [];  
  @Output() idProductEventEmitter = new EventEmitter();
  total:number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // let itemsChange= changes['items'];
    this.calculateTotal();
    this.saveSession();        
  }
  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id);
  }
  calculateTotal():void{
    this.total = this.items.reduce( (acc,item) => acc + item.product.price * item.quantity , 0);
  }
  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }
}
