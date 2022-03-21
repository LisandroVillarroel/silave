import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimeFichaCabeceraComponent } from './imprime-ficha-cabecera.component';

describe('ImprimeFichaCabeceraComponent', () => {
  let component: ImprimeFichaCabeceraComponent;
  let fixture: ComponentFixture<ImprimeFichaCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimeFichaCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimeFichaCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
