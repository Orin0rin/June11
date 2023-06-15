import { AppComponent } from './app.component';
import { PodcastComponent } from './Podcast/podcast.component';
import { LoginComponent } from './Login/login.component';

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

import 'bootstrap/dist/js/bootstrap';
import 'jquery-datetimepicker';
import 'bootstrap';
import 'bootstrap-datetime-picker';
import './Podcast/jquery.datetimepicker.d.ts';
import { SidebarComponent } from './Side_Menu/sidebar.component';




const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'podcast' , component: PodcastComponent},
  {path: 'sidebar', component: SidebarComponent}
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
   NestedTreeControl,
   MatTreeNestedDataSource,
   MatTreeModule,
   MatIconModule



 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
