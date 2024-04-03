import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  data: any = null;

  constructor(private employeeService: EmployeeService) { }

  page: number = 0;
  size: number = 20;

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.get(this.page, this.size).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
    })
  }

  deleteEmployee(id : number) : void {
    this.employeeService.delete(id).subscribe(remoteData => {
      this.data = remoteData;
      console.log(this.data);
      this.data.page.totalPages = remoteData.page.totalPages;
    })
    location.reload();
  }

  changePage(delta: number): void {
    if (delta == 1) {
      this.page++;
      this.getEmployee();
    } else {
      this.page--;
      this.getEmployee();
    }
  }

  lastPage(): void {
    this.page = this.data.page.totalPages-1;
    this.getEmployee();
  }

  firstPage(): void {
    this.page = 0;
    this.getEmployee();
    console.log(this.page);
  }

  
}
