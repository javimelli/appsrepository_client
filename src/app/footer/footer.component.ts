import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

	private anio;
	
	constructor() {
		let fecha = new Date();
		this.anio = fecha.getFullYear();
	}

	ngOnInit() {
	}

}
