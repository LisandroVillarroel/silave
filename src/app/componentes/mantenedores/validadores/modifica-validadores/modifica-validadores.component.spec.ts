import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaValidadoresComponent } from './modifica-validadores.component';

describe('ModificaValidadoresComponent', () => {
  let component: ModificaValidadoresComponent;
  let fixture: ComponentFixture<ModificaValidadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaValidadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaValidadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
