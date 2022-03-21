import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaRazaComponent } from './elimina-raza.component';

describe('EliminaRazaComponent', () => {
  let component: EliminaRazaComponent;
  let fixture: ComponentFixture<EliminaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminaRazaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
