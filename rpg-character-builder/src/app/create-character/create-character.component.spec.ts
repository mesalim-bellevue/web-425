import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCharacterComponent } from './create-character.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from '../character-list/character-list.component';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, CreateCharacterComponent, CharacterListComponent], // Import the standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Should generate a random character ID between 1 and 1000 with no decimal places
  it('should generate a random character ID between 1 and 1000', () => {
    const generatedId = component.generateCharacterId();
    expect(generatedId).toBeGreaterThanOrEqual(1);
    expect(generatedId).toBeLessThanOrEqual(1000);
    expect(Number.isInteger(generatedId)).toBeTrue();
  });

  // Test 2: Should add a character with correct customization
  it('should add a character with correct customization', () => {
    const testCharacter = {
      id: 0,
      name: 'John',
      gender: 'Male',
      class: 'Warrior',
      faction: 'Alliance',
      startingLocation: 'Stormwind',
      funFact: 'Loves to explore',
    };

    component.character = { ...testCharacter };
    component.onSubmit();

    expect(component.characters.length).toBe(1);
    const addedCharacter = component.characters[0];
    expect(addedCharacter.name).toBe('John');
    expect(addedCharacter.gender).toBe('Male');
    expect(addedCharacter.class).toBe('Warrior');
    expect(addedCharacter.faction).toBe('Alliance');
    expect(addedCharacter.startingLocation).toBe('Stormwind');
    expect(addedCharacter.funFact).toBe('Loves to explore');
    expect(addedCharacter.id).toBeGreaterThanOrEqual(1);
  });

  // Test 3: Should reset all form fields to their default values after resetForm is called
  it('should reset all form fields to default values after resetForm is called', () => {
    component.character = {
      id: 123,
      name: 'John',
      gender: 'Male',
      class: 'Warrior',
      faction: 'Alliance',
      startingLocation: 'Stormwind',
      funFact: 'Loves to explore',
    };

    component.resetForm();

    expect(component.character.id).toBe(0);
    expect(component.character.name).toBe('');
    expect(component.character.gender).toBe('Male');
    expect(component.character.class).toBe('Warrior');
    expect(component.character.faction).toBe('');
    expect(component.character.startingLocation).toBe('');
    expect(component.character.funFact).toBe('');
  });
});
