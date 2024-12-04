import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { CardPokemonComponent } from "../card-pokemon/card-pokemon.component";

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [CardPokemonComponent],
  templateUrl: './list-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPokemonComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
