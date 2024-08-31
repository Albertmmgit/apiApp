import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { UserviewComponent } from './pages/userview/userview.component';
import { UserformComponent } from './pages/userform/userform.component';

export const routes: Routes = [

    {path: "", pathMatch: "full", redirectTo: "home"},
    {path: "home", component: HomeComponent, children: [
        {path: "", pathMatch: "full", redirectTo: "usuarios"},
        {path: "usuarios", component: UserlistComponent},
        {path: "usuario/:_id", component: UserviewComponent},
        {path: "nuevo-usuario", component: UserformComponent},
        {path: "actualizar-usuario/:_id", component: UserformComponent}
    ]}
];
