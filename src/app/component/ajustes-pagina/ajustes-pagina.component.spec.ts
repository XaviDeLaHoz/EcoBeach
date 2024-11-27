import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesPaginaComponent } from './ajustes-pagina.component';

describe('AjustesPaginaComponent', () => {
  let component: AjustesPaginaComponent;
  let fixture: ComponentFixture<AjustesPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjustesPaginaComponent]
    });
    fixture = TestBed.createComponent(AjustesPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
