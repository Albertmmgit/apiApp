import { Component, Input, inject } from '@angular/core';
import { UsercardComponent } from '../../components/usercard/usercard.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [UsercardComponent, SearchComponent],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {

  usersServices = inject(UsersService)
  arrUsers: Iuser[] = []
  // user: Iuser | null = null
  page: number = 1
  totalPages!: number
  arr: any = []
  totalUsers: Iuser[] = []
  InputTouch: boolean = false

  ngOnInit() {
    this.drawUsers(this.page)
    this.getTotalPages()
    console.log("hola")
    console.log(this.page)
  }

async getTotalPages() {
  try {
    const response = await this.usersServices.getPages()
    this.totalPages = response.total_pages
    console.log(this.totalPages)
  } catch (error) {
  }
}

  async drawUsers(page: number) {
    try {
      const response = await this.usersServices.getAll(page)
      this.arrUsers = response.results
      window.scrollTo(0,0)
    } catch (error) {
    }
    this.page = page
    console.log(this.page)
  }

  changePage(direction: 'next' | 'previous') {
    if (direction === 'next' && this.page < this.totalPages) {
      this.page++;
    } else if (direction === 'previous' && this.page > 1) {
      this.page--;
    }
    this.drawUsers(this.page);
  }

  // Al hacer esta funcion me encontre el problema que solo podía buscar usuarios de una misma página y que tenia problemas con los accentos. El primero lo resolvi generando un array con todos los usuarios, el segundo fue gracias a internet ya que desconozco el metodo normalize.

  async search(event: string) {
    if (!this.InputTouch) {
      this.InputTouch = true
      try {
        for (let i = 1; i <= this.totalPages; i++) {
          const arr = await this.usersServices.getAll(i)
          const nose = arr.results
          console.log(nose)
          this.totalUsers = this.totalUsers.concat(nose)
        }
      } catch (error) {
      }
    }
    this.arrUsers = this.totalUsers.filter(user => user.first_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(event.toLowerCase()) )
    if (event == "") {
      this.drawUsers(this.page)
    }
    
  }
}
