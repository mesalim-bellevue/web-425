import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterFactionComponent } from './character-faction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CharacterFactionComponent', () => {
  let component: CharacterFactionComponent;
  let fixture: ComponentFixture<CharacterFactionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFactionComponent, HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFactionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle errors when data is not found', () => {
    component.ngOnInit();
  
    const req = httpMock.expectOne('http://localhost:3000/api/character-factions');
    req.flush('Factions not found', { status: 404, statusText: 'Not Found' });
  
    expect(component.errorMessage).toEqual('Failed to load factions. Please try again later.');
  
    httpMock.verify();
  });

  it('should correctly fetch a list of character factions', () => {
  
    const mockFactions = [
      { name: 'Faction One', description: 'Description One' },
      { name: 'Faction Two', description: 'Description Two' }
    ];
  
    component.ngOnInit();
  
    const req = httpMock.expectOne('http://localhost:3000/api/character-factions');
    req.flush(mockFactions);
  
    expect(component.factions).toEqual(mockFactions);
  
    httpMock.verify();
  });

  it('should update the characterFactions div when character factions are found', () => {  
    fixture.detectChanges();

    const mockFactions = [
      { name: 'Faction One', description: 'Description One' },
      { name: 'Faction Two', description: 'Description Two' }
    ];
  
  
    const req = httpMock.expectOne('http://localhost:3000/api/character-factions');
    req.flush(mockFactions);
    fixture.detectChanges();
  
    const factionElements = fixture.nativeElement.querySelectorAll('.faction-card');
  
    expect(factionElements.length).toBe(2);
  
    expect(factionElements[0].querySelector('h3').textContent).toContain('Faction One');
    expect(factionElements[0].querySelector('p').textContent).toContain('Description One');
  
    httpMock.verify();
  });
});
