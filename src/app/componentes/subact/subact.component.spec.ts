import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubactComponent } from './subact.component';

describe('SubactComponent', () => {
  let component: SubactComponent;
  let fixture: ComponentFixture<SubactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
