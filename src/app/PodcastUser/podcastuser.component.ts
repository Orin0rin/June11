import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { PodcastUserService } from './podcastuser.service';
import { PodcastUserChild } from './podcastuser-child.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'podcast',
  templateUrl: './podcastuser.component.html',
  styleUrls: ['./podcastuser.component.scss']
 })
 export class PodcastUserComponent implements OnInit {

  @ViewChild('addEditModalContent')
	addEditModalContent: TemplateRef<any> | any;
  truncateTextRenderer(params: { value: string; }) {
    const maxLength = 10; // Change this to the desired length
    const text = params.value || '';
    const truncatedText = text.substring(0, maxLength);
    return truncatedText;
  }

 public columnDefs: ColDef[] = [
   { field: 'title',width:110},
   { field: 'publishDate',width:240, editable:true, cellRenderer: this.truncateTextRenderer },
   { field: 'description',width:250},
   {
    headerName: 'Audio',
    field: 'voiceAddress',
    cellRenderer: (params: { value: any; }) => {
      const audio = document.createElement('audio');
      audio.setAttribute('controls', '');
      const sanitizedPath = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:4200/${params.value}`);
      audio.innerHTML = `<source src="${sanitizedPath}" type="audio/mpeg">`;
      return audio;
    }
  }
 ];

 public frameworkComponents;
 public context;
 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
   resizable: true
 };

 // Data that gets displayed in the grid
 rowData$: any;
 podcastGroups: any;
 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 constructor(private http: HttpClient, private podcastuserSrv: PodcastUserService, private modal: NgbModal, private sanitizer: DomSanitizer) {
  this.context={componentParent: this};
  this.frameworkComponents ={
    childMessageRenderer:PodcastUserChild,
  };
 }

 ngOnInit()
{
  this.podcastuserSrv.getAllPodcastGroups().subscribe(result=>this.podcastGroups=result);
}
reload() {

  this.podcastuserSrv.getAllPodcasts().subscribe((rec: any) => {
this.onGridReady(rec);
  });
}

 // Example load data from server
 onGridReady(params: GridReadyEvent) {

  this.podcastuserSrv.getAllPodcasts().subscribe((rec: any) => {this.rowData$ = rec.list;});
}



CloseModal()
{
  this.modal.dismissAll();
}



 title="Welcome User!";
}

