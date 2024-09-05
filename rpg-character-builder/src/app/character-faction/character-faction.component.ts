import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Faction {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-faction',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './character-faction.component.html',
  styleUrl: './character-faction.component.css'
})
export class CharacterFactionComponent {
  factions: Faction[] = [
    { name: 'Warriors of Light', description: 'Group for those who live to protect and serve.' },
    { name: 'Mages of Shadow', description: 'Group that practices black magic to one day rule the world.' }
  ];

  factionName = '';
  factionDescription = '';
  editingFaction: Faction | null = null;  // Correct declaration

  saveFaction() {
    if (this.editingFaction) {
      this.editingFaction.name = this.factionName;
      this.editingFaction.description = this.factionDescription;
      this.editingFaction = null;  // Correct assignment
    } else {
      this.factions.push({
        name: this.factionName,
        description: this.factionDescription
      });
    }
    this.factionName = '';
    this.factionDescription = '';
  }

  editFaction(faction: Faction) {
    this.factionName = faction.name;
    this.factionDescription = faction.description;
    this.editingFaction = faction;
  }

  deleteFaction(faction: Faction) {
    this.factions = this.factions.filter(f => f !== faction);
  }
}
