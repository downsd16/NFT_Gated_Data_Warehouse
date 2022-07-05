import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFabComponent } from './button-fab.component';

describe('ButtonFabComponent', () => {
  let component: ButtonFabComponent;
  let fixture: ComponentFixture<ButtonFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
