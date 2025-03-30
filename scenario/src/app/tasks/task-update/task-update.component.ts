import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';  
import { TaskService } from '../task.service';  
import { Task } from '../../task-types';  
import { FormsModule } from '@angular/forms';  

@Component({  
  selector: 'app-task-update',  
  standalone: true,  
  imports: [FormsModule],  
  templateUrl: './task-update.component.html',  
})  
export class TaskUpdateComponent implements OnInit {  
  protected task: Task | null = null;  
  private taskId: string;  

  constructor(  
    private taskService: TaskService,  
    private route: ActivatedRoute,  
    private router: Router  
  ) {  
    this.taskId = this.route.snapshot.paramMap.get('id') || '';  
  }  

  protected ngOnInit(): void {  
    this.taskService.getTaskById(this.taskId).subscribe(task => {  
      this.task = task;  
    });  
  }  

  protected onSubmit(): void {  
    if (this.task) {  
      this.taskService.updateTask(this.taskId, this.task).subscribe(() => {  
        this.router.navigate(['/tasks']);  
      });  
    }  
  }  
}  
