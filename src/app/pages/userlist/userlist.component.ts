import { Component, inject } from '@angular/core';
import { UsercardComponent } from '../../components/usercard/usercard.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [UsercardComponent],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  usersServices = inject(UsersService)
  arrUsers: Iuser[] = []
  user: Iuser | null = null
  page: number = 1
  totalPages: number = 2


  ngOnInit() {
    this.drawUsers()
  }

  async drawUsers(page: number = this.page) {
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
    this.drawUsers();
    console.log(this.page)
  }
}
