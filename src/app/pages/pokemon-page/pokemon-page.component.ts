import { ChangeDetectionStrategy, Component, inject, OnInit, signal, input, Input } from '@angular/core';
import { ListPokemonComponent } from "../../pokemon/components/list-pokemon/list-pokemon.component";
import { ListPokemonSkeletonComponent } from "../../pokemon/components/list-pokemon-skeleton/list-pokemon-skeleton.component";
import { PokemonsService } from '../../pokemon/services/pokemons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { map, tap } from 'rxjs';
import { SimplePokemon } from '../../pokemon/interfaces';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [ListPokemonComponent, ListPokemonSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  // public currentName = signal('Fernando');

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  // private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  // public currentPage = toSignal<number>(
  //   this.route.queryParamMap.pipe(
  //     map((params) => params.get('page') ?? '1'),
  //     map((page) => (isNaN(+page) ? 1 : +page)),
  //     map((page) => Math.max(1, page))
  //   )
  // );

  // currentPage = input('page');
  @Input('page') currentPage: string = '0';

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(console.log);
    console.log(this.currentPage);

    this.loadPokemons();
    // title
    // Meta-tags
    // Stable
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    let pageToLoad = (isNaN(+this.currentPage) ? 1 : +this.currentPage) + page;
    pageToLoad = Math.max(1, pageToLoad);

    // console.log({ pageToLoad, currentPage: this.currentPage() });

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
