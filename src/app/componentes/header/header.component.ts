import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isImprimirRoute: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Observa los cambios de ruta para actualizar la propiedad isImprimirRoute
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isImprimirRoute = this.router.url.endsWith('/imprimir');
    });
  }
}
