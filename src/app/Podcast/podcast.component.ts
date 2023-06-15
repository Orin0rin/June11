import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild , AfterViewInit, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { PodcastService } from './podcast.service';
import { PodcastChild } from './podcast-child.component';
import { PodcastDto } from './podcast.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jquery-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap-datetime-picker';
import './jquery.datetimepicker.d.ts';
import Swal from 'sweetalert2';






@Component({
 selector: 'podcast',
 templateUrl: './podcast.component.html',
 styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements AfterViewInit, OnInit {

  @ViewChild('addEditModalContent')
	addEditModalContent: TemplateRef<any> | any;


 public columnDefs: ColDef[] = [
   { field: 'id', width: 80},
   { field: 'title',width:110 ,editable:true},
   { field: 'publishDate',width:240, editable:true },
   { field: 'description',width:250, editable:true },
   { field: 'podcastGroupName',width:250, editable:true },
   {field: 'example', width:100},
   { field: 'buttons',
     cellRenderer: 'childMessageRenderer',
     headerName: 'buttons',
     colId: 'params',
   }
 ];
 public currentItem: PodcastDto | any;
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
 podcast: PodcastDto | undefined;
 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 constructor(private http: HttpClient, private podcastSrv: PodcastService, private modal: NgbModal) {
  this.context={componentParent: this};
  this.frameworkComponents ={
    childMessageRenderer:PodcastChild,
  };
 }

 ngOnInit()
{
  this.podcastSrv.getAllPodcastGroups().subscribe(result=>this.podcastGroups=result);
}
reload() {

  this.podcastSrv.getAllPodcasts().subscribe((rec: any) => {
this.onGridReady(rec);
  });
}

 // Example load data from server
 onGridReady(params: GridReadyEvent) {

  this.podcastSrv.getAllPodcasts().subscribe((rec: any) => {this.rowData$ = rec.list;});
}


 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }

CloseModal()
{
  this.modal.dismissAll();
}
showDelete( podcast :PodcastDto)
{
  Swal.fire({
    title: 'Are you sure?',
    text: 'This podcast will be deleted forever!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.value) {
      this.podcastSrv.deletePodcast(podcast.id).subscribe(() => {
      this.reload();
    });
    this.reload();
      Swal.fire(
        'Delete',
        'The operation has done successfully',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancel',
        'The operation was cancelled.',
        'error'
      )
    }
  })
}
ShowAddEditModal(item: PodcastDto|any)
{
  this.podcastSrv.selectPodcast(item);
  this.currentItem = new PodcastDto();
  this.modal.open(this.addEditModalContent, { size: 'sm' });
  if (item)
  {
    this.podcastSrv.podcastSelected.subscribe(podcast => this.currentItem = podcast);
  }
}
AddPodcast(){
  this.podcastSrv.AddPodcast(this.currentItem);
  this.CloseModal();
  this.reload();
}

EditPodcast(currentItem: any)
{
  this.podcastSrv.EditPodcast(this.currentItem);
  this.CloseModal();
  this.reload();
}



ngAfterViewInit() {
  $('#datetimepicker').datetimepicker();
}
openDatetimepicker() {
  $('#datetimepicker').datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss'
  }).on('dp.change', (event: any) => {
    this.currentItem.publishDate = event.target.value;
  });
}

 title="June11 HELLO";
}
