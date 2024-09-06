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
  page: number = 1
  totalPages!: number
  totalUsers: Iuser[] = []
  InputTouch: boolean = false

  ngOnInit() {
    this.drawUsers(this.page)
    this.getTotalPages()
  }

async getTotalPages() {
  try {
    const response = await this.usersServices.getPages()
    this.totalPages = response.total_pages
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
  }

  changePage(direction: 'next' | 'previous') {
    if (direction === 'next' && this.page < this.totalPages) {
      this.page++;
    } else if (direction === 'previous' && this.page > 1) {
      this.page--;
    }
    this.drawUsers(this.page);
  }

  // Para estos casos de busqueda encontre en internet este método .normalize("NFD").replace(/[\u0300-\u036f]/g, "") para eliminar los accentos de los datos del array. Desde un punto de vista profesional es mejor permitir la busqueda con accentos o sin?

  async search(event: string) {
    console.log(event)
    if (!this.InputTouch) {
      this.InputTouch = true
      try {
        for (let i = 1; i <= this.totalPages; i++) {
          const array = await this.usersServices.getAll(i)
          const users = array.results
          this.totalUsers = this.totalUsers.concat(users)
        }
      } catch (error) {
      }
    }
    this.arrUsers = this.totalUsers.filter(user => user.first_name.toLowerCase().includes(event.toLowerCase()) )
    if (event == "") {
      this.drawUsers(this.page)
    }
    
  }
}
