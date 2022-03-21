import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesIngresadosComponent } from './examenes-ingresados.component';

describe('ExamenesIngresadosComponent', () => {
  let component: ExamenesIngresadosComponent;
  let fixture: ComponentFixture<ExamenesIngresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesIngresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesIngresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
