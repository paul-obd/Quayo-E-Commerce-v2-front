import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/e-commerce/Item.model';
import { ItemsService } from '../../shared/services/e-commerce/items.service';



@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit {

  public displayedColumns = ['img', 'name', 'price', 'quantity', 'add-to-basket'];

  constructor(public itemsService: ItemsService) {
   

  }

  ngOnInit(): void {
  }


  items: Item[] = this.itemsService.items



  isItemDivisibleByTwo(name: string): boolean {
    let i = this.items.findIndex(i => i.description == name)
    if (i % 2 === 0) {
      return true;
    }
    else {
      return false
    }
  }

}