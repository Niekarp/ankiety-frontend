import { Component, OnInit } from '@angular/core';
import {} from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare var $: any;


@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit
{
	appTitle: String ="Ankiety"
	constructor(public router: Router, public auth: AuthService) { }
	
	ngOnInit()
	{
	}
	
	onAboutAnchorClick()
	{
		$.fn.pagepiling.moveTo(2);
	}

	onLogoutButtonClick()
	{
		this.auth.signOut();
	}
}
