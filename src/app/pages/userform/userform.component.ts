import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser.interface';
import { IusersList } from '../../interfaces/iusers-list.interface';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {
  usersForm: FormGroup
  userService = inject(UsersService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  type: string = "NUEVO"
  typeBtn: String = "Guardar Usuario"
  errorForm: any[] = []

  constructor() {
    this.usersForm = new FormGroup ({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?\/?$/)
      ])
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( async (params: any) => {
      if (params._id) {
        this.type = "ACTUALIZAR"
        this.typeBtn = "Actualizar Usuario"
        const user: Iuser = await this.userService.getById(params._id)
        this.usersForm = new FormGroup ({
          _id: new FormControl(user._id, []),
          first_name: new FormControl(user.first_name, []),
          last_name: new FormControl(user.last_name, []),
          email: new FormControl(user.email, []),
          image: new FormControl(user.image, []),
        })
      }
    })
  }

  controlForm (formControlName: string, validator: string) {
    return this.usersForm.get(formControlName)?.hasError(validator) && this.usersForm.get(formControlName)?.touched
  }

  async getDataForm() {
    if (this.usersForm.value._id) {
      try {
        const response: Iuser = await this.userService.update(this.usersForm.value)
        if (response._id) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Actualizado",
            showConfirmButton: false,
            timer: 1500,
            imageWidth: 100, 
            imageHeight: 100,
            width: "300px",
          });
            this.router.navigate(['/home', 'usuario', response._id])   
        }
      } catch ({error}: any) {
        this.errorForm = error 
      }
    } else {
      try {
        const response: IusersList = await this.userService.insert(this.usersForm.value)
        if(response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Creado",
            showConfirmButton: false,
            timer: 1500,
            imageWidth: 100, 
            imageHeight: 100,
            width: "300px",
          });        
          this.router.navigate(['/home', 'usuarios'])
        }
      } catch ({error}: any) {
        this.errorForm = error
      }
    }
  }
}
