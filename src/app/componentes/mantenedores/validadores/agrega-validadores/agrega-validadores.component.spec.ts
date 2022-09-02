import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaValidadoresComponent } from './agrega-validadores.component';

describe('AgregaValidadoresComponent', () => {
  let component: AgregaValidadoresComponent;
  let fixture: ComponentFixture<AgregaValidadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaValidadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaValidadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
