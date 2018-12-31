import { Component, OnInit } from '@angular/core';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // isUserLoggedIn: boolean;

  // tramite dependency injection rendo disponibile in questo componente una istanza del servizio di autenticazione
  // lo referenzierò direttamente dal template html
  constructor(private hardCodedAuth: HardCodedAuthenticationService) {
    // this.isUserLoggedIn = false;
  }

  // NB non metto il risultato in una variabile booleana perché questo metodo viene chiamato solo all'istanziazione del componente
  // così facendo, siccome il menu non viene riaggiornato se non con un refresh del tab del browser, il menu non cambia dopo login/logout
  ngOnInit() {
    // this.isUserLoggedIn = this.hardCodedAuth.isUserLoggedIn();
  }

}
