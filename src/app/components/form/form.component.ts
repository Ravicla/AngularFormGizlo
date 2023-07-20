import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  myform: FormGroup
  type: string = 'Register';
  constructor(
    private usersServices: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){

    this.myform = new FormGroup ({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      address: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

  async getDataForm() : Promise<void>{
    if(this.myform.valid) { } 
    else {
      Swal.fire(
      'Informacion!',
      'El formulario no esta bien relleno',
      'info');
    }
    
    let newUser = this.myform.value; 
    if(newUser.id > 0) {
      let response = await this.usersServices.update(newUser);
      if(response.userId) {
        
        Swal.fire(
          'OK!',
          'Updated user',
          'success')
          .then((result) => {
            this.router.navigate(['/list']);
        });          
      } 
      else {
        Swal.fire(
          'Error!',
          response.error,
          'error')
          .then((result) => {
            this.router.navigate(['/form']);
        });
      }  
    } 
    else {
      let response = await this.usersServices.create(newUser)
      if(response.userId) {
        Swal.fire(
          'OK!',
          'User created!',
          'success')
          .then((result) => {
            this.router.navigate(['/list']);
        });
      } 
      else {
        Swal.fire(
          'Error!',
          'Error with new user',
          'error')
          .then((result) => {
            this.router.navigate(['/form']);
        });
      }  
    }

  }

  ngOnInit(): void {  
    this.activatedRoute.params.subscribe(async(params: any) => {
      let id: number = parseInt(params.iduser);
      if(id){
        this.type = 'Update'
        const response = await this.usersServices.getById(id)
        const user: User = response
        this.myform = new FormGroup({
          name: new FormControl(user?.name, []),
          lastName: new FormControl(user?.lastName, []),
          phoneNumber: new FormControl(user?.phoneNumber, []),
          email: new FormControl(user?.email, []),
          address: new FormControl(user?.address, []),
          id: new FormControl(user?.userId, [])
        }, [])
      }
    })
  }

  checkControl(pControlName: string, pError: string): boolean{
    if(this.myform.get(pControlName)?.hasError(pError) && this.myform.get(pControlName)?.touched){
      return true;
    } 
    else {
      return false;
    }
  }

}
