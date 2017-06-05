import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-dataset-detalle',
  templateUrl: './dataset-detalle.component.html',
  styleUrls: ['./dataset-detalle.component.css']
})
export class DatasetDetalleComponent implements OnInit {

	private datasetId;

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {
		this.datasetId = this.activatedRoute.snapshot.params['id'];
	}

  ngOnInit() {
  }

}
