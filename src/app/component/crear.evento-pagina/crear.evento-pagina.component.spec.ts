import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventoPaginaComponent } from './crear.evento-pagina.component';

describe('CrearEventoPaginaComponent', () => {
  let component: CrearEventoPaginaComponent;
  let fixture: ComponentFixture<CrearEventoPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEventoPaginaComponent]
    });
    fixture = TestBed.createComponent(CrearEventoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
