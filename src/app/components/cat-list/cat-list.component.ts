import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBreed } from 'src/app/models/breed.interface';
import { ICat } from 'src/app/models/cat.interface';
import { GetBreedList } from 'src/app/shared/breeds/breeds.actions';
import { BreedsState } from 'src/app/shared/breeds/breeds.state';
import { GetCatList } from 'src/app/shared/catList/catList.actions';
import { CatListState } from 'src/app/shared/catList/catList.state';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit, OnDestroy {
  private originalList: ICat[] = [];
  private subscriptions: Subscription[] = []

  public catList: ICat[] = [];
  public breedList: string[] = [];

  public limit = new FormControl('10');
  public breeds = new FormControl('');

  @ViewChild('allSelected') private allSelected!: MatOption;
  @Select(CatListState.getCatList) catListStore!: Observable<ICat[]>;
  @Select(BreedsState.getBreedList) breedsStore!: Observable<IBreed[]>;
  
  constructor(private store: Store, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllData();
  }

  private getAllData(): void {
    this.getAllCats();
    this.store.dispatch(new GetBreedList());
    this.subscriptions.push(this.breedsStore.subscribe((data: IBreed[]) => {
      data.forEach((item) => {
        this.breedList.push(item.name)
      })
    }))
  }

  public getAllCats(): void {
    this.store.dispatch(new GetCatList(this.limit.value));
    this.subscriptions.push(this.catListStore.subscribe((data) => {
      this.catList = data;
      this.originalList = data;
    }))
  }

  public togglePerOne(): void {
    const selectedBreeds = this.breeds.value;
  
    if (selectedBreeds.includes(-1)) {
      this.catList = this.originalList.filter((cat) => {
        return (
          (cat.breeds.length < 1 || cat.breeds.some((breed) => selectedBreeds.includes(breed.name))) &&
          selectedBreeds.includes(-1)
        );
      });
    } else {
      this.catList = this.originalList.filter((cat) => {
        return cat.breeds.some((breed) => selectedBreeds.includes(breed.name));
      });
    }

    if(!selectedBreeds.length) this.catList = [...this.originalList]
  }

  public toggleAllSelection(): void {
    if(this.allSelected.selected){
      this.breeds.patchValue([...this.breedList, 0, -1]);
    } else {
      this.breeds.patchValue([]);
    }
    this.catList = [...this.originalList];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe())
  }
}
