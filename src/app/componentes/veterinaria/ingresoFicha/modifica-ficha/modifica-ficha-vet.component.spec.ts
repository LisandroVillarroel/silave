import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaFichaVetComponent } from './modifica-ficha-vet.component';

describe('ModificaFichaComponent', () => {
  let component: ModificaFichaVetComponent;
  let fixture: ComponentFixture<ModificaFichaVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaFichaVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaFichaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
