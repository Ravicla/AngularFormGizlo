import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  myUser: User | any;
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params: any) => {
      let id: number = parseInt(params.iduser)
      let response = await this.usersService.getAll();
      if(response.error){
        Swal.fire(response.error, '', 'error');
      }   
      this.myUser = response;
      console.log(this.myUser);
    })
  }

  deleteUser(pId: number | undefined): void {
    Swal.fire({
      title: "Do you want to delete the user ?",
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) { 
        if(pId !== undefined) { 
          this.usersService.delete(pId).then(response => {
          console.log(response)
          
            Swal.fire(
            'OK!',
            'User deleted',
            'success')
            .then((result) => {
              this.usersService.getAll()
            });
            
          })
          .catch(err => console.log(err))
        }       
      }
    })      
  } 

}
