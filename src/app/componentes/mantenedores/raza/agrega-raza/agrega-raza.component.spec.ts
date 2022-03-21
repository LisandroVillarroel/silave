import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaRazaComponent } from './agrega-raza.component';

describe('AgregaRazaComponent', () => {
  let component: AgregaRazaComponent;
  let fixture: ComponentFixture<AgregaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaRazaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
