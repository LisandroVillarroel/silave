import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autentica/login';
import { AuthGuard } from './autentica/_guards';
import { DatosEmpresaComponent } from './componentes/administracion/ADM/datos-empresa/datos-empresa.component';
import { UsuariosEmpresaComponent } from './componentes/administracion/ADM/usuarios-empresa/usuarios-empresa.component';
import { PerfilEmpresaComponent } from './componentes/administracion/perfil-empresa/perfil-empresa.component';
import { PerfilesUsuarioComponent } from './componentes/administracion/perfiles-usuario/perfiles-usuario.component';
import { ResetContrasenaComponent } from './componentes/administracion/reset-contrasena/reset-contrasena.component';
import { ActualizaDatosComponent } from './componentes/datosPersonales/actualiza-datos/actualiza-datos.component';
import { CambioContrasenaComponent } from './componentes/datosPersonales/cambio-contrasena/cambio-contrasena.component';
import { ConsultaFichaExamenComponent } from './componentes/fichaExamen/consulta/consulta-ficha-examen/consulta-ficha-examen.component';
import { ExamenFichaComponent } from './componentes/fichaExamen/examen/examen-ficha.component';
import { FichaComponent } from './componentes/fichaExamen/ficha/ficha.component';
import { ClienteComponent } from './componentes/mantenedores/cliente/cliente.component';
import { DoctorSolicitanteComponent } from './componentes/mantenedores/doctor-solicitante/doctor-solicitante.component';
import { EspecieComponent } from './componentes/mantenedores/especie/especie.component';
import { ExamenComponent } from './componentes/mantenedores/examen/examen.component';
import { FormatosComponent } from './componentes/mantenedores/formatos/formatos.component';
import { RazaComponent } from './componentes/mantenedores/raza/raza.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { HomeComponent } from './home';

const routes: Routes = [
  { path: '', component: PortadaComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: PortadaComponent, canActivate: [AuthGuard] },

  { path: 'mantenedorEmpresa', component: DatosEmpresaComponent, canActivate: [AuthGuard]},
  { path: 'administraUsuarioAdm', component: UsuariosEmpresaComponent, canActivate: [AuthGuard]},
  { path: 'resetKey/:token/:id', component: ResetContrasenaComponent},
  { path: 'cambioContrasena', component: CambioContrasenaComponent, canActivate: [AuthGuard] },
  { path: 'actualizaDatos', component: ActualizaDatosComponent, canActivate: [AuthGuard] },
  { path: 'actualizaDatosEmpresa', component: PerfilEmpresaComponent, canActivate: [AuthGuard] },

  { path: 'administraUsuario', component: PerfilesUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'ingresoFicha', component: FichaComponent, canActivate: [AuthGuard]},
  { path: 'ingresoExamenFicha', component: ExamenFichaComponent, canActivate: [AuthGuard]},
  { path: 'consultaExamenFicha', component: ConsultaFichaExamenComponent, canActivate: [AuthGuard]},

  { path: 'mantenedorCliente', component: ClienteComponent, canActivate: [AuthGuard]},
  { path: 'mantenedorPaciente', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'mantenedorExamen', component: ExamenComponent, canActivate: [AuthGuard] },
  { path: 'mantenedorEspecie', component: EspecieComponent, canActivate: [AuthGuard] },
  { path: 'mantenedorRaza', component: RazaComponent, canActivate: [AuthGuard] },

  { path: 'mantenedorFormatos', component: FormatosComponent, canActivate: [AuthGuard] },

  {path: 'doctorSolicitante', component: DoctorSolicitanteComponent, canActivate: [AuthGuard]},


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
