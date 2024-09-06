import { Component, Input, Output, inject } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UsercardComponent {
  @Input() myUser!: Iuser
  userService = inject(UsersService)
 
  delete(id: string | undefined, name: string | undefined) {
    if (id) {
      Swal.fire({
        text: "Estas seguro que quieres borrar el usuario " + name,
        imageUrl: "/assets/images/papelera.jpg",
        imageWidth: 100, 
        imageHeight: 100, 
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        width: "300px",
        cancelButtonText: "No"
      }).then(( async (result) => {
        if (result.isConfirmed) {
          try {
            const response: Iuser = await this.userService.delete(id)
            if (response._id) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario borrado",
                showConfirmButton: false,
                timer: 1500,
                imageWidth: 100, 
                imageHeight: 100,
                width: "300px",
              });             
            }
          } catch (error) {
          }
        }
      }));
      }
    }
}
