import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaValidadoresComponent } from './elimina-validadores.component';

describe('EliminaValidadoresComponent', () => {
  let component: EliminaValidadoresComponent;
  let fixture: ComponentFixture<EliminaValidadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaValidadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaValidadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
