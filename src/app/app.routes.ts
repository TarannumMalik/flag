import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FlagComponent } from './flag/flag.component';
import { HostingComponent } from './hosting/hosting.component';

export const routes: Routes = [
    {path:"flag",component:FlagComponent},
    {path:"",redirectTo:"flag",pathMatch:"full"},
    {path:"hosting", component:HostingComponent}
];
