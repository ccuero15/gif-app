import { GifsService } from './../../../gifs/services/gifs.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) { }
  get tags() {
    return this.gifsService.tagsHistory
  }
  searchTag(tag: string) {
    this.gifsService.searchTag(tag)
  }
}
