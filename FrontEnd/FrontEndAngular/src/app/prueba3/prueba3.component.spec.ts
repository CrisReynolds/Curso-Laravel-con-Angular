import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prueba3Component } from './prueba3.component';

describe('Prueba3Component', () => {
  let component: Prueba3Component;
  let fixture: ComponentFixture<Prueba3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Prueba3Component]
    });
    fixture = TestBed.createComponent(Prueba3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
