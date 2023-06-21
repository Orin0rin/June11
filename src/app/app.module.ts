import { AppComponent } from './app.component';
import { PodcastComponent } from './Podcast/podcast.component';
import { LoginComponent } from './Login/login.component';
import { SidebarComponent } from './Side_Menu/sidebar.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import 'bootstrap/dist/js/bootstrap';
import 'jquery-datetimepicker';
import 'bootstrap';
import 'bootstrap-datetime-picker';
import './Podcast/jquery.datetimepicker.d.ts';





const routes: Routes = [
  {path: 'sidebar' , component: SidebarComponent},
  {path: '' , component: LoginComponent},
  {path: 'podcast' , component: PodcastComponent}
];



@NgModule({
 declarations: [
   AppComponent,
   PodcastComponent,
   LoginComponent
 ],
 imports: [
   BrowserModule,
   HttpClientModule,
   AgGridModule,
   FormsModule,
   ReactiveFormsModule,
   BrowserAnimationsModule,
   NgbModule,
   MatFormFieldModule,
   MatInputModule,
   AppRoutingModule,
   RouterModule.forRoot(routes),
   MatCardModule,
   MatSidenavModule,
   MatTreeModule,
   MatIconModule,
   MatButtonModule,
   MatMenuModule,
   MatToolbarModule,
   MatListModule,
   MatExpansionModule,
   MatTooltipModule,
   MatDialogModule
 ],
 exports: [RouterModule],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
