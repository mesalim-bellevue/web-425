import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  players = [
    { id: 1, name: 'Rose', class: 'Warrior', level: 45 },
    { id: 2, name: 'Celena', class: 'Mage', level: 60 },
    { id: 3, name: 'Nahil', class: 'Archer', level: 40 },
    { id: 4, name: 'Yelena', class: 'Warrior', level: 50 }
  ];

  searchQuery: string = '';
  filteredPlayers: any[] = [];

  constructor() {
    this.filteredPlayers = this.players;
  }

  searchPlayers() {
    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addPlayer() {
    // Example function to add a new player
    const newId = this.players.length + 1;
    this.players.push({
      id: newId,
      name: `New Player ${newId}`,
      class: 'Unknown',
      level: 1
    });
  }
}
