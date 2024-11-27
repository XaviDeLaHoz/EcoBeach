import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicioComponent } from './pagina-inicio.component';

describe('PaginaInicioComponent', () => {
  let component: PaginaInicioComponent;
  let fixture: ComponentFixture<PaginaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaInicioComponent]
    });
    fixture = TestBed.createComponent(PaginaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
