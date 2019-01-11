import { Component } from "@angular/core";
import { DeseosService } from '../../services/deseos.service';
import { Lista, ListaItem } from "../../models";
import { NavParams } from "ionic-angular";

@Component({
    selector: 'page-agregar',
    templateUrl: 'agregar.component.html'
})
export class AgregarPage {

    lista: Lista;
    nombreItem: string = '';

    constructor( public deseosServie: DeseosService,
                 private navParams: NavParams ){
                     
        const titulo = this.navParams.get('titulo');

        if( this.navParams.get('lista') ) {
            this.lista = this.navParams.get('lista');
        } else {
            
            this.lista = new Lista( titulo );
            this.deseosServie.agregarLista( this.lista );

        }

        
    }

    agregarItem() {
        
        if ( this.nombreItem.length === 0 ) {
            return;
        }

        const nuevoItem = new ListaItem( this.nombreItem );
        this.lista.items.push( nuevoItem );

        this.deseosServie.guardarStorage();

        this.nombreItem = '';

    }

    actualizarTarea( item: ListaItem ) {
        item.completado = !item.completado;

        const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;

        if ( pendientes === 0 ) {
            this.lista.terminada = true;
            this.lista.terminadaEn = new Date();
        } else {
            this.lista.terminada = false;
            this.lista.terminadaEn = null;
        }

        this.deseosServie.guardarStorage();
    }

    borrar( idx: number ) {

        this.lista.items.splice( idx, 1 );
        this.deseosServie.guardarStorage();

    }

}