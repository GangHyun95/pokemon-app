'use client';

import Loading from '@/components/Loading';
import PokemonCard from '@/components/PokemonCard';
import { fetchPokemonByName } from '@/lib/api';
import { PokemonDetail } from '@/lib/types';
import { useUserStore } from '@/store/useUserStore';
import { useEffect, useState } from 'react';

export default function page() {
    const { userDetails } = useUserStore();
    const [bookmarkedPokemons, setBookmarkedPokemons] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (userDetails?.bookmarks) {
            setLoading(true);
            const fetchPokemons = async () => {
                const pokemonDetails = await Promise.all(
                    userDetails.bookmarks.map(async (pokemon) => {
                        const details = await fetchPokemonByName(pokemon);
                        return details;
                    })
                );
                setBookmarkedPokemons(pokemonDetails);
            };
            setLoading(false);
            fetchPokemons();
        }
    }, [userDetails?.bookmarks]);

    if (loading) return <Loading />;
    
    return (
        <main>
            {!loading && (
                <section className='min-h-[91vh]'>
                    {bookmarkedPokemons.length > 0 ? (
                        <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {bookmarkedPokemons.map((pokemon, index) => (
                                <PokemonCard
                                    key={pokemon.name + index}
                                    pokemon={pokemon}
                                />
                            ))}
                        </div>
                    ) : (
                        <h2 className='text-center text-2xl font-bold text-gray-800 mt-20'>
                            No bookmarked pokemons
                        </h2>
                    )}
                </section>
            )}
        </main>
    );
}
