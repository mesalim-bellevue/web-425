import { Component, Input } from '@angular/core';
import { Guild } from '../create-guild/create-guild.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guild-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guild-list.component.html',
  styleUrl: './guild-list.component.css'
})
export class GuildListComponent {
  @Input() guilds: Guild[] = [];
}
