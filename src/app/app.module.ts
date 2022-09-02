import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// used to create fake backend
import { fakeBackendProvider } from './autentica/_helpers';
import { AlertComponent } from './autentica/_components';
import { JwtInterceptor, ErrorInterceptor } from './autentica/_helpers';
import { LoginComponent } from './autentica/login/login.component';
import { RegisterComponent } from './autentica/register';

//import { RutModule } from 'rut-chileno'; // <- aqui debes importarlo
import { Ng2Rut, RutValidator } from 'ng2-rut';
import { ImageUploadModule } from "angular2-image-upload";


import { HomeComponent } from './home';

import { MenuListItemComponent } from './componentes/menu-list-item/menu-list-item.component';
import { PortadaComponent } from './componentes/portada/portada.component';

import { PropietarioComponent } from './componentes/mantenedores/propietario/propietario.component' ;
import { ModificaPropietarioComponent } from './componentes/mantenedores/propietario/modifica-propietario/modifica-propietario.component';

import { EliminaPropietarioComponent } from './componentes/mantenedores/propietario/elimina-propietario/elimina-propietario.component';
import { ConsultaPropietarioComponent } from './componentes/mantenedores/propietario/consulta-propietario/consulta-propietario.component';

// Servicios
import { MenuService } from './servicios/menu.service';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
import localeFrExtra from '@angular/common/locales/extra/es';
import { AutoFocusDirective } from './directivas/auto-focus.directive';
import { EditModeDirective } from './directivas/edit-mode.directive';
import { ViewModeDirective } from './directivas/view-mode.directive';
import { FocusableDirective } from './directivas/focusable.directive';

import { ClienteComponent } from './componentes/mantenedores/cliente/cliente.component';
import { AgregaClienteComponent } from './componentes/mantenedores/cliente/agrega-cliente/agrega-cliente.component';
import { ModificaClienteComponent } from './componentes/mantenedores/cliente/modifica-cliente/modifica-cliente.component';
import { ConsultaClienteComponent } from './componentes/mantenedores/cliente/consulta-cliente/consulta-cliente.component';
import { EliminaClienteComponent } from './componentes/mantenedores/cliente/elimina-cliente/elimina-cliente.component';
import { ExamenComponent } from './componentes/mantenedores/examen/examen.component';

import { AgregaExamenComponent } from './componentes/mantenedores/examen/agrega-examen/agrega-examen.component';
import { ModificaExamenComponent } from './componentes/mantenedores/examen/modifica-examen/modifica-examen.component';
import { ConsultaExamenComponent } from './componentes/mantenedores/examen/consulta-examen/consulta-examen.component';
import { EliminaExamenComponent } from './componentes/mantenedores/examen/elimina-examen/elimina-examen.component';

import { MaterialModule } from './material.module';

import { AgregaPropietarioComponent } from './componentes/mantenedores/propietario/agrega-propietario/agrega-propietario.component';
import { EspecieComponent } from './componentes/mantenedores/especie/especie.component';
import { AgregaEspecieComponent }   from './componentes/mantenedores/especie/agrega-especie/agrega-especie.component';
import { ConsultaEspecieComponent } from './componentes/mantenedores/especie/consulta-especie/consulta-especie.component';
import { ModificaEspecieComponent } from './componentes/mantenedores/especie/modifica-especie/modifica-especie.component';
import { EliminaEspecieComponent } from './componentes/mantenedores/especie/elimina-especie/elimina-especie.component';
import { RazaComponent } from './componentes/mantenedores/raza/raza.component';
import { AgregaRazaComponent } from './componentes/mantenedores/raza/agrega-raza/agrega-raza.component';
import { ConsultaRazaComponent } from './componentes/mantenedores/raza/consulta-raza/consulta-raza.component';
import { EliminaRazaComponent } from './componentes/mantenedores/raza/elimina-raza/elimina-raza.component';
import { ModificaRazaComponent } from './componentes/mantenedores/raza/modifica-raza/modifica-raza.component';
import { DoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/doctor-solicitante.component';
import { AgregaDoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/agrega-doctor-solicitante/agrega-doctor-solicitante.component';
import { ConsultaDoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/consulta-doctor-solicitante/consulta-doctor-solicitante.component';
import { ModificaDoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/modifica-doctor-solicitante/modifica-doctor-solicitante.component';
import { EliminaDoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/elimina-doctor-solicitante/elimina-doctor-solicitante.component';
import { FichaComponent } from './componentes/fichaExamen/ficha/ficha.component';
import { AgregaFichaComponent } from './componentes/fichaExamen/ficha/agrega-ficha/agrega-ficha.component';
import { ModificaFichaComponent } from './componentes/fichaExamen/ficha/modifica-ficha/modifica-ficha.component';
import { ConsultaFichaComponent } from './componentes/fichaExamen/ficha/consulta-ficha/consulta-ficha.component';
import { EliminaFichaComponent } from './componentes/fichaExamen/ficha/elimina-ficha/elimina-ficha.component';
import { ExamenFichaComponent } from './componentes/fichaExamen/examen/examen-ficha.component';
import { HemogramaComponent } from './componentes/fichaExamen/examen/hemograma/hemograma.component';
import { MenuMatComponent } from './componentes/menu-mat/menu-mat.component';
import { ImprimeHemogramaComponent } from './componentes/fichaExamen/examen/hemograma/imprime-hemograma/imprime-hemograma.component';
import { ImprimeFichaCabeceraComponent } from './componentes/fichaExamen/examen/imprime-ficha-cabecera/imprime-ficha-cabecera.component';
import { ConsultaFichaExamenComponent } from './componentes/fichaExamen/consulta/consulta-ficha-examen/consulta-ficha-examen.component';
import { PerfilesUsuarioComponent } from './componentes/administracion/perfiles-usuario/perfiles-usuario.component';
import { AgregaPerfilUsuarioComponent } from './componentes/administracion/perfiles-usuario/agrega-perfil-usuario/agrega-perfil-usuario.component';
import { ModificaPerfilUsuarioComponent } from './componentes/administracion/perfiles-usuario/modifica-perfil-usuario/modifica-perfil-usuario.component';
import { ConsultaPerfilUsuarioComponent } from './componentes/administracion/perfiles-usuario/consulta-perfil-usuario/consulta-perfil-usuario.component';
import { EliminaPerfilUsuarioComponent } from './componentes/administracion/perfiles-usuario/elimina-perfil-usuario/elimina-perfil-usuario.component';
import { MenuListItemPerfilComponent } from './componentes/administracion/perfiles-usuario/menu-list-item-perfil/menu-list-item-perfil.component';
import { ActualizaDatosComponent } from './componentes/datosPersonales/actualiza-datos/actualiza-datos.component';
import { CambioContrasenaComponent } from './componentes/datosPersonales/cambio-contrasena/cambio-contrasena.component';
import { ResetContrasenaComponent } from './componentes/administracion/reset-contrasena/reset-contrasena.component';
import { DatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/datos-empresa.component';
import { AgregaDatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/agrega-datos-empresa/agrega-datos-empresa.component';
import { ModificaDatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/modifica-datos-empresa/modifica-datos-empresa.component';
import { ConsultaDatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/consulta-datos-empresa/consulta-datos-empresa.component';
import { EliminaDatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/elimina-datos-empresa/elimina-datos-empresa.component';
import { UsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/usuarios-empresa.component';
import { AgregaUsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/agrega-usuarios-empresa/agrega-usuarios-empresa.component';
import { ModificaUsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/modifica-usuarios-empresa/modifica-usuarios-empresa.component';
import { ConsultaUsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/consulta-usuarios-empresa/consulta-usuarios-empresa.component';
import { EliminaUsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/elimina-usuarios-empresa/elimina-usuarios-empresa.component';
import { PerfilEmpresaComponent } from './componentes/administracion/perfil-empresa/perfil-empresa.component';
import { HeaderComponent } from './componentes/fichaExamen/examen/header/header.component';
import { FooterComponent } from './componentes/fichaExamen/examen/footer/footer.component';
import { PerfilBioquimicoComponent } from './componentes/fichaExamen/examen/perfil-bioquimico/perfil-bioquimico.component';
import { ImprimePerfilBioquimicoComponent } from './componentes/fichaExamen/examen/perfil-bioquimico/imprime-perfil-bioquimico/imprime-perfil-bioquimico.component';
import { PruebasDeCoagulacionComponent } from './componentes/fichaExamen/examen/pruebas-de-coagulacion/pruebas-de-coagulacion.component';
import { ImprimePruebasDeCoagulacionComponent } from './componentes/fichaExamen/examen/pruebas-de-coagulacion/imprime-pruebas-de-coagulacion/imprime-pruebas-de-coagulacion.component';

import { FichaVetComponent } from './componentes/veterinaria/ingresoFicha/ficha-vet.component';
import { ModificaFichaVetComponent } from './componentes/veterinaria/ingresoFicha/modifica-ficha/modifica-ficha-vet.component';
import { ConsultaFichaVetComponent } from './componentes/veterinaria/ingresoFicha/consulta-ficha/consulta-ficha-vet.component';
import { EliminaFichaVetComponent } from './componentes/veterinaria/ingresoFicha/elimina-ficha/elimina-ficha-vet.component';
import { ConsultaFichaExamenVetComponent } from './componentes/veterinaria/fichaExamen/consulta-ficha-examen-vet/consulta-ficha-examen-vet.component';
import { DoctorSolicitanteVetComponent } from './componentes/veterinaria/mantenedores/doctor-solicitante-vet/doctor-solicitante-vet.component';
import { AgregaDoctorSolicitanteVetComponent } from './componentes/veterinaria/mantenedores/doctor-solicitante-vet/agrega-doctor-solicitante-vet/agrega-doctor-solicitante-vet.component';
import { ConsultaDoctorSolicitanteVetComponent } from './componentes/veterinaria/mantenedores/doctor-solicitante-vet/consulta-doctor-solicitante-vet/consulta-doctor-solicitante-vet.component';
import { EliminaDoctorSolicitanteVetComponent } from './componentes/veterinaria/mantenedores/doctor-solicitante-vet/elimina-doctor-solicitante-vet/elimina-doctor-solicitante-vet.component';
import { ModificaDoctorSolicitanteVetComponent } from './componentes/veterinaria/mantenedores/doctor-solicitante-vet/modifica-doctor-solicitante-vet/modifica-doctor-solicitante-vet.component';
import { ValidadoresComponent } from './componentes/mantenedores/validadores/validadores.component';
import { ModificaValidadoresComponent } from './componentes/mantenedores/validadores/modifica-validadores/modifica-validadores.component';
import { AgregaValidadoresComponent } from './componentes/mantenedores/validadores/agrega-validadores/agrega-validadores.component';
import { ConsultaValidadoresComponent } from './componentes/mantenedores/validadores/consulta-validadores/consulta-validadores.component';
import { EliminaValidadoresComponent } from './componentes/mantenedores/validadores/elimina-validadores/elimina-validadores.component';
registerLocaleData(localeFr, 'es', localeFrExtra);

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MenuMatComponent,
        PortadaComponent,
        AutoFocusDirective,
        EditModeDirective,
        ViewModeDirective,
        FocusableDirective,
        PropietarioComponent,
        AgregaPropietarioComponent,
        ModificaPropietarioComponent,
        EliminaPropietarioComponent,
        ConsultaPropietarioComponent,
        MenuListItemComponent,
        ClienteComponent,
        EliminaClienteComponent,
        ConsultaClienteComponent,
        ModificaClienteComponent,
        AgregaClienteComponent,
        ExamenComponent,
        AgregaExamenComponent,
        ModificaExamenComponent,
        ConsultaExamenComponent,
        EliminaExamenComponent,
        EspecieComponent,
        AgregaEspecieComponent,
        ConsultaEspecieComponent,
        ModificaEspecieComponent,
        EliminaEspecieComponent,
        RazaComponent,
        AgregaRazaComponent,
        ConsultaRazaComponent,
        EliminaRazaComponent,
        ModificaRazaComponent,
        DoctorSolicitanteComponent,
        AgregaDoctorSolicitanteComponent,
        ConsultaDoctorSolicitanteComponent,
        ModificaDoctorSolicitanteComponent,
        EliminaDoctorSolicitanteComponent,
        FichaComponent,
        AgregaFichaComponent,
        ModificaFichaComponent,
        ConsultaFichaComponent,
        EliminaFichaComponent,
        ExamenFichaComponent,
        HemogramaComponent,
        ImprimeHemogramaComponent,
        ImprimeFichaCabeceraComponent,
        ConsultaFichaExamenComponent,
        PerfilesUsuarioComponent,
        AgregaPerfilUsuarioComponent,
        ModificaPerfilUsuarioComponent,
        ConsultaPerfilUsuarioComponent,
        EliminaPerfilUsuarioComponent,
        MenuListItemPerfilComponent,
        ActualizaDatosComponent,
        CambioContrasenaComponent,
        ResetContrasenaComponent,
        DatosEmpresaComponent,
        AgregaDatosEmpresaComponent,
        ModificaDatosEmpresaComponent,
        ConsultaDatosEmpresaComponent,
        EliminaDatosEmpresaComponent,
        UsuariosEmpresaComponent,
        AgregaUsuariosEmpresaComponent,
        ModificaUsuariosEmpresaComponent,
        ConsultaUsuariosEmpresaComponent,
        EliminaUsuariosEmpresaComponent,
        PerfilEmpresaComponent,
        HeaderComponent,
        FooterComponent,
        PerfilBioquimicoComponent,
        ImprimePerfilBioquimicoComponent,
        PruebasDeCoagulacionComponent,
        ImprimePruebasDeCoagulacionComponent,
        FichaVetComponent,
        ModificaFichaVetComponent,
        ConsultaFichaVetComponent,
        EliminaFichaVetComponent,
        ConsultaFichaExamenVetComponent,
        DoctorSolicitanteVetComponent,
        AgregaDoctorSolicitanteVetComponent,
        ConsultaDoctorSolicitanteVetComponent,
        EliminaDoctorSolicitanteVetComponent,
        ModificaDoctorSolicitanteVetComponent,
        ValidadoresComponent,
        ModificaValidadoresComponent,
        AgregaValidadoresComponent,
        ConsultaValidadoresComponent,
        EliminaValidadoresComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
    //    RutModule,
        Ng2Rut,
   //     routing,
        //
        ImageUploadModule.forRoot(),
        MaterialModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'es' },
        fakeBackendProvider,
        RutValidator
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
