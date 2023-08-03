import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ICat } from '../../models/cat.interface';
import { CatListService } from '../../services/cat-list.service';
import { GetCatList } from './catList.actions';

export interface CatListStateModel {
    catList: ICat[];
}

@State<CatListStateModel>({
    name: 'catList',
    defaults: {
        catList: []
    }
})

@Injectable()
export class CatListState {
    constructor(private catListService: CatListService) { }

    @Selector()
    static getCatList(state: CatListStateModel) {
        return state.catList;
    }

    @Action(GetCatList)
    getCats({getState, setState}: StateContext<CatListStateModel>, {limit}: GetCatList) {
        return this.catListService.getAllCats(limit).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                catList: result,
            });
        }));
    }
}