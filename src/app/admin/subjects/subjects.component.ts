import { Component, OnInit, ViewChild } from '@angular/core';
import {Subject} from '../../models/subjects';
import { SubjectsService} from '../../services/subjects.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import { Store, select } from "@ngrx/store";
import { selectAll } from "../../store/subjects/subjects.selector";
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'webui-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'], 
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  })

export class SubjectsComponent implements OnInit {
  private data$: any;
  data: Subject[];
  
  constructor(
    private subjects: SubjectsService,
    private store: Store<{ subjects }>,
  ) {
    this.data$ = this.store.pipe(select(selectAll));
  }
  private displayedColumns: string[] = ['subjectName', 'subjectDescription'];
  private expandedElement: Subject  | null;
  private subjectsList: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  getSubjects(): void {this.data$.subscribe(response => {
    this.data = response;
    this.subjectsList = new MatTableDataSource<Subject>(this.data);
    this.subjectsList.sort = this.sort;
    this.subjectsList.paginator = this.paginator;
  });
  if (!this.data) {
    this.subjects.getSubjects();
  }
  
}

private applyFilter(filterValue: string) {
  filterValue = filterValue.trim().toLowerCase();
  this.subjectsList.filter = filterValue;
}

  ngOnInit(){    
    this.getSubjects();
  }  
}
