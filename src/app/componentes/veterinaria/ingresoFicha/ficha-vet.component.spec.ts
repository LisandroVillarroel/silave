import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaVetComponent } from './ficha-vet.component';

describe('FichaComponent', () => {
  let component: FichaVetComponent;
  let fixture: ComponentFixture<FichaVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaVetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
