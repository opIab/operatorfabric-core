import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableComponent } from './resizable.component';

describe('ResizableComponent', () => {
  let component: ResizableComponent;
  let fixture: ComponentFixture<ResizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // window.addEventListener('resize', spy);
    fixture = TestBed.createComponent(ResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create resizable component', () => {
    expect(component).toBeTruthy();
  });
  it('shoud test if the height of the resize is invoked after', () => {
    expect(component.resized).toBeTruthy();
  });
});
