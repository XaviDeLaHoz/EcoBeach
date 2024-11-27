import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCreadosPaginaComponent } from './eventos-creados-pagina.component';

describe('EventosCreadosPaginaComponent', () => {
  let component: EventosCreadosPaginaComponent;
  let fixture: ComponentFixture<EventosCreadosPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosCreadosPaginaComponent]
    });
    fixture = TestBed.createComponent(EventosCreadosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
