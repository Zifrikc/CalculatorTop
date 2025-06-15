import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparacionIgualacionPage } from './comparacion-igualacion.page';

describe('ComparacionIgualacionPage', () => {
  let component: ComparacionIgualacionPage;
  let fixture: ComponentFixture<ComparacionIgualacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparacionIgualacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
