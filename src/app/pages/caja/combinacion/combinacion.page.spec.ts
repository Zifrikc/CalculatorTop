import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CombinacionPage } from './combinacion.page';

describe('CombinacionPage', () => {
  let component: CombinacionPage;
  let fixture: ComponentFixture<CombinacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
