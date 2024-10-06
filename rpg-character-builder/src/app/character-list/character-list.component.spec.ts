import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display characters passed via Input property', () => {
    const testCharacters = [
      {
        id: 1,
        name: 'Aragorn',
        gender: 'Male',
        class: 'Warrior',
        faction: 'Rangers',
        startingLocation: 'Rivendell',
        funFact: 'Descendant of Isildur',
      },
      {
        id: 2,
        name: 'Legolas',
        gender: 'Male',
        class: 'Archer',
        faction: 'Elves',
        startingLocation: 'Mirkwood',
        funFact: 'Master archer',
      },
    ];

    component.characters = testCharacters; // Pass characters to the component
    fixture.detectChanges(); // Trigger change detection

    const characterCards = fixture.nativeElement.querySelectorAll('.character-card');
    expect(characterCards.length).toBe(2); // Ensure two characters are displayed
    expect(characterCards[0].textContent).toContain('Aragorn'); // Verify character name
    expect(characterCards[1].textContent).toContain('Legolas');
  });

  it('should display a message when no characters are available', () => {
    component.characters = []; // Set the characters array to empty
    fixture.detectChanges(); // Trigger change detection

    const emptyMessage = fixture.nativeElement.querySelector('.empty-message');
    expect(emptyMessage).toBeTruthy(); // Ensure the empty message element exists
    expect(emptyMessage.textContent).toContain('No characters available'); // Verify message content
  });
});
