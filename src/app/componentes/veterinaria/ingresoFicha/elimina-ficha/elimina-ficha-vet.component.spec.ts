import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaFichaVetComponent } from './elimina-ficha-vet.component';

describe('EliminaFichaComponent', () => {
  let component: EliminaFichaVetComponent;
  let fixture: ComponentFixture<EliminaFichaVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaFichaVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaFichaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
