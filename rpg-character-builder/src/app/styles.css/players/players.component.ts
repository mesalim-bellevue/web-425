import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Fae' | 'Mage' | 'Vampire' | 'Soulfinder' | 'Rogue' | 'Warrior' | 'Assassin';
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  characters: Character[] = [
    { 
      name: 'Thorn', 
      gender: 'Male', 
      class: 'Warrior', 
      faction: 'The Iron Brotherhood', 
      startingLocation: 'Ironhold', 
      funFact: 'Thorn once single-handedly defeated a dragon.' 
    },
    { 
      name: 'Elara', 
      gender: 'Female', 
      class: 'Mage', 
      faction: 'The Silver Circle', 
      startingLocation: 'Silvermoon', 
      funFact: 'Elara can speak to animals.' 
    },
    { 
      name: 'Kara', 
      gender: 'Female', 
      class: 'Rogue', 
      faction: 'Shadow Guild', 
      startingLocation: 'Darkwood', 
      funFact: 'Kara has never been caught while stealing.' 
    },
    { 
      name: 'Borin', 
      gender: 'Male', 
      class: 'Warrior', 
      faction: 'Mountain Clans', 
      startingLocation: 'Stonekeep', 
      funFact: 'Borin can lift twice his body weight.' 
    },
    { 
      name: 'Lyra', 
      gender: 'Female', 
      class: 'Mage', 
      faction: 'Mystic Order', 
      startingLocation: 'Crystal Cavern', 
      funFact: 'Lyra once cast a spell that made the sun shine for 24 hours.' 
    },
    { 
      name: 'Ragnar', 
      gender: 'Male', 
      class: 'Rogue', 
      faction: 'Silent Assassins', 
      startingLocation: 'Black Marsh', 
      funFact: 'Ragnar can move silently even on dried leaves.' 
    },
    { 
      name: 'Seraphina', 
      gender: 'Female', 
      class: 'Warrior', 
      faction: 'The Dawnbringers', 
      startingLocation: 'Sunspire', 
      funFact: 'Seraphina once led a successful charge against an orc horde.' 
    },
    { 
      name: 'Zarek', 
      gender: 'Male', 
      class: 'Mage', 
      faction: 'Stormcallers', 
      startingLocation: 'Thunder Peak', 
      funFact: 'Zarek can control the weather with his staff.' 
    },
    { 
      name: 'Nyx', 
      gender: 'Other', 
      class: 'Rogue', 
      faction: 'Nightblades', 
      startingLocation: 'Shadowfell', 
      funFact: 'Nyx can see in complete darkness.' 
    },
    { 
      name: 'Thalia', 
      gender: 'Female', 
      class: 'Warrior', 
      faction: 'The Valkyries', 
      startingLocation: 'Valhalla', 
      funFact: 'Thalia is undefeated in over 100 duels.' 
    }
  ];

  constructor() {  }

  ngOnInit(): void {}
}