import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaEspecieComponent } from './agrega-especie.component';

describe('AgregaComponent', () => {
  let component: AgregaEspecieComponent;
  let fixture: ComponentFixture<AgregaEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaEspecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
