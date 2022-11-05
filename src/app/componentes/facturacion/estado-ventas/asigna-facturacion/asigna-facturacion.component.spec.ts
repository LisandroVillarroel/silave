import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaFacturacionComponent } from './asigna-facturacion.component';

describe('AsignaFacturacionComponent', () => {
  let component: AsignaFacturacionComponent;
  let fixture: ComponentFixture<AsignaFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaFacturacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
