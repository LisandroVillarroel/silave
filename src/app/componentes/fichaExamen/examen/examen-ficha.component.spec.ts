import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenFichaComponent } from './examen-ficha.component';

describe('ExamenFichaComponent', () => {
  let component: ExamenFichaComponent;
  let fixture: ComponentFixture<ExamenFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
