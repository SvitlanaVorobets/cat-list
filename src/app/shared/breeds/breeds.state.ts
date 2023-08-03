import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { IBreed } from '../../models/breed.interface';
import { CatListService } from '../../services/cat-list.service';
import { GetBreedList } from './breeds.actions';

export interface BreedListStateModel {
    breeds: IBreed[];
}

@State<BreedListStateModel>({
    name: 'breeds',
    defaults: {
        breeds: []
    }
})

@Injectable()
export class BreedsState {
    constructor(private catListService: CatListService) { }

    @Selector()
    static getBreedList(state: BreedListStateModel) {
        return state.breeds;
    }

    @Action(GetBreedList)
    getBreeds({getState, setState}: StateContext<BreedListStateModel>) {
        return this.catListService.getAllBreeds().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                breeds: result,
            });
        }));
    }
}