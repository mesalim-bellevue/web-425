import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterListComponent } from '../character-list/character-list.component';

export interface Character {
  id: number;
  name: string;
  gender: string;
  class: string;
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CharacterListComponent],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.css'
})

export class CreateCharacterComponent {
  characters: Character[] = [];
  
  @Output() characterCreated = new EventEmitter<Character>();

  character: Character = {
    id: 0,
    name: '',
    gender: 'Male',
    class: 'Warrior',
    faction: '',
    startingLocation: '',
    funFact: ''
  };

  generateCharacterId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  };

  onSubmit() {
    if (this.character.name && this.character.gender && this.character.class) {
      this.character.id = this.generateCharacterId();
      this.characters.push({ ...this.character });

      this.characterCreated.emit({ ...this.character });
      
      this.resetForm();
    } else {
      console.error('All fields must be filled out.')
    }
  }

  resetForm() {
    this.character = {
      id: 0,
      name: '',
      gender: 'Male',
      class: 'Warrior',
      faction: '',
      startingLocation: '',
      funFact: ''
    };
  }
}