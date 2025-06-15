import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioPage } from './cambio.page';

describe('CambioPage', () => {
  let component: CambioPage;
  let fixture: ComponentFixture<CambioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
