import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaFichaComponent } from './agrega-ficha.component';

describe('AgregaFichaComponent', () => {
  let component: AgregaFichaComponent;
  let fixture: ComponentFixture<AgregaFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
