import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: 'employee', component: EmployeeComponent, canActivate: [loginGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule), canActivate: [loginGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'booking/:roomid', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule), //canActivate: [loginGuard]
    },
    { path: 'comments', loadChildren: () => import('./comment/comment.module').then(c => c.CommentModule) },
    { path: '**', component: NotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
