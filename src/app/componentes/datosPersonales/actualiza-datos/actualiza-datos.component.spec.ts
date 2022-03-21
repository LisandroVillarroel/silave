import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaDatosComponent } from './actualiza-datos.component';

describe('ActualizaDatosComponent', () => {
  let component: ActualizaDatosComponent;
  let fixture: ComponentFixture<ActualizaDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
