import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadoresComponent } from './validadores.component';

describe('ValidadoresComponent', () => {
  let component: ValidadoresComponent;
  let fixture: ComponentFixture<ValidadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
