import { ComponentFixture, TestBed } from '@angular/core/testing';

// Correct the import path if the file is named 'perfumes.component.ts'
import { PerfumesComponent } from './perfumes.component';

describe('PerfumesComponent', () => {
  let component: PerfumesComponent;
  let fixture: ComponentFixture<PerfumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [PerfumesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
