import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaRazaComponent } from './modifica-raza.component';

describe('ModificaComponent', () => {
  let component: ModificaRazaComponent;
  let fixture: ComponentFixture<ModificaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaRazaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
