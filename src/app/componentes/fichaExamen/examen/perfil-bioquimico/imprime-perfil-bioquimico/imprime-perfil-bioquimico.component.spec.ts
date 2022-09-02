import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimePerfilBioquimicoComponent } from './imprime-perfil-bioquimico.component';

describe('ImprimePerfilBioquimicoComponent', () => {
  let component: ImprimePerfilBioquimicoComponent;
  let fixture: ComponentFixture<ImprimePerfilBioquimicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimePerfilBioquimicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimePerfilBioquimicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
