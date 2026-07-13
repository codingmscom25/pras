import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {

ApiLog,

ApiLogDetails,

LogService,

LogStatistics

} from '../../services/log.service';

@Component({

selector:'app-logs',

imports:[

CommonModule,

FormsModule

],

templateUrl:'./logs.html',

styleUrl:'./logs.css'

})

export class Logs implements OnInit{

constructor(

private logService:LogService,

private cdr:ChangeDetectorRef

){}

statistics!:LogStatistics;

logs:ApiLog[]=[];

filteredLogs:ApiLog[]=[];

pagedLogs:ApiLog[]=[];

selectedLog!:ApiLogDetails;

showDetails=false;

loading=false;

search='';

method='All';

status='All';

sortOrder:'DESC'|'ASC'='DESC';

currentPage=1;

pageSize=10;

totalPages=1;

ngOnInit(){

this.loadStatistics();

this.loadLogs();

}

loadStatistics(){

this.logService

.getStatistics()

.subscribe({

next:res=>{

this.statistics=res.data;

this.cdr.detectChanges();

}

});

}

loadLogs(){

this.loading=true;

this.logService

.getLogs()

.subscribe({

next:res=>{

this.logs=res.data;

this.filteredLogs=[...this.logs];

this.loading=false;

this.sortLogs();

},

error:()=>{

this.loading=false;

}

});

}

viewLog(log:ApiLog){

this.logService

.getDetails(log.id)

.subscribe({

next:res=>{

this.selectedLog=res.data;

this.showDetails=true;

}

});

}

closeDrawer(){

this.showDetails=false;

}


applyFilters(){

this.filteredLogs=this.logs.filter(log=>{

const search=

log.endpoint

.toLowerCase()

.includes(

this.search.toLowerCase()

)

||

log.client

.toLowerCase()

.includes(

this.search.toLowerCase()

);

const method=

this.method==='All'

||

log.method===this.method;

const status=

this.status==='All'

||

log.status.toString()===this.status;

return search &&

method &&

status;

});

this.currentPage=1;

this.sortLogs();

}
sortLogs(){

this.filteredLogs.sort((a,b)=>{

const first=

new Date(a.createdAt).getTime();

const second=

new Date(b.createdAt).getTime();

return this.sortOrder==='DESC'

?

second-first

:

first-second;

});

this.updatePagination();

}

updatePagination(){

this.totalPages=Math.ceil(

this.filteredLogs.length/

this.pageSize

);

if(this.totalPages===0){

this.totalPages=1;

}

const start=

(this.currentPage-1)

*this.pageSize;

const end=

start+this.pageSize;

this.pagedLogs=

this.filteredLogs.slice(

start,

end

);

}
nextPage(){

if(

this.currentPage<

this.totalPages

){

this.currentPage++;

this.updatePagination();

}

}

previousPage(){

if(

this.currentPage>1

){

this.currentPage--;

this.updatePagination();

}

}

get startRecord(){

if(

this.filteredLogs.length===0

){

return 0;

}

return

(this.currentPage-1)

*this.pageSize+1;

}

get endRecord(){

return Math.min(

this.currentPage*

this.pageSize,

this.filteredLogs.length

);

}
}