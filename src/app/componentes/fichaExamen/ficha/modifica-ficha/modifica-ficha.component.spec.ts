import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFichaComponent } from './modifica-ficha.component';

describe('ModificaFichaComponent', () => {
  let component: ModificaFichaComponent;
  let fixture: ComponentFixture<ModificaFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
