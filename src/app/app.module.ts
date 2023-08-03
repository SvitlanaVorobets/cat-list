import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { CatItemComponent } from './components/cat-list/cat-item/cat-item.component';
import { environment } from 'src/environments/environment';
import { CatListState } from './shared/catList/catList.state';
import { BreedsState } from './shared/breeds/breeds.state';

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    CatItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgxsModule.forRoot([CatListState, BreedsState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
