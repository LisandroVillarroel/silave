import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaClienteComponent } from './modifica-cliente.component';

describe('ModificaClienteComponent', () => {
  let component: ModificaClienteComponent;
  let fixture: ComponentFixture<ModificaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
