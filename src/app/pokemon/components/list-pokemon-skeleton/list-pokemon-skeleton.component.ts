import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-pokemon-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './list-pokemon-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPokemonSkeletonComponent { }
