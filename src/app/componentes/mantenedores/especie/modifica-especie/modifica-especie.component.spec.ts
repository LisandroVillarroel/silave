import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaEspecieComponent } from './modifica-especie.component';

describe('ModificaEspecieComponent', () => {
  let component: ModificaEspecieComponent;
  let fixture: ComponentFixture<ModificaEspecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaEspecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaEspecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
