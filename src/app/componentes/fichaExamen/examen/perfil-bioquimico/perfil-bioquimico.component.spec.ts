import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilBioquimicoComponent } from './perfil-bioquimico.component';

describe('PerfilBioquimicoComponent', () => {
  let component: PerfilBioquimicoComponent;
  let fixture: ComponentFixture<PerfilBioquimicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilBioquimicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilBioquimicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
