import { Component, inject } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-userview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userview.component.html',
  styleUrl: './userview.component.css'
})
export class UserviewComponent {
  user: Iuser | null = null
  activateRoute = inject(ActivatedRoute)
  userServices = inject(UsersService)

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      let id = (params._id)
      this.user = await this.userServices.getById(id)
    })

  }

  // imagino que debe haber una forma que no tener que duplicar la función delete en los dos componentes, pero no lo he encontrado, tampoco he sabido encajarla en el servicio para llamarla desde allí.


  delete(id: string | undefined) {
    if (id) {
      Swal.fire({
        text: "Estas seguro que quieres borrar el usuario " + this.user?.first_name,
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
            const response: Iuser = await this.userServices.delete(id)
            if (response._id) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario borrado",
                showConfirmButton: false,
                timer: 1500,
                imageWidth: 100, 
                imageHeight: 100,
                width: "300px"
              });
            }
          } catch (error) {
          }
        }
      }));
    }
  }
}
