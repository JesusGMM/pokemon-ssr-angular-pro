import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPokemonComponent {

  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id
      }.png`
  );

  // logEffect = effect(() => {
  //   console.log('PokemonCard: ', this.pokemon());
  // });

}
