import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './create-guild.component.html',
  styleUrl: './create-guild.component.css'
})
export class CreateGuildComponent {
  guildName: string = '';
  guildDescription: string = '';
  guildType: string = 'adventure';
  guildFeatures: { quests: boolean; raids: boolean; trading: boolean; pvp: boolean } = {
    quests: false,
    raids: false,
    trading: false,
    pvp: false,
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  createGuild() {
    // Reset messages
    this.successMessage = null;
    this.errorMessage = null;

    // Check if required fields are filled
    if (this.guildName && this.guildDescription) {
      const newGuild = {
        name: this.guildName,
        description: this.guildDescription,
        type: this.guildType,
        features: this.guildFeatures,
      };

      // Perform the logic to handle the created guild (e.g., send to a server or update state)
      console.log('Guild Created:', newGuild);

      // Display success message
      this.successMessage = `Guild "${this.guildName}" was successfully created!`;

      // Reset the form
      this.guildName = '';
      this.guildDescription = '';
      this.guildType = 'adventure';
      this.guildFeatures = { quests: false, raids: false, trading: false, pvp: false };
    } else {
      // Display error message if validation fails
      this.errorMessage = 'Guild name and description are required.';
    }
  }
}