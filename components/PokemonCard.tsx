import { PokemonDetail } from '@/lib/types';
import { typeColor } from '@/utils/colors';
import { arrowAngleRight } from '@/utils/Icons';
import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

export default function PokemonCard({ pokemon }: { pokemon: PokemonDetail }) {
    return (
        <div className='relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
                <ActionButtons pokemon={pokemon} />
                <Link
                    href={`/pokemon/${pokemon.name}`}
                    className='p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-300 border-gray-300 hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out'
                >
                    {arrowAngleRight}
                </Link>
            </div>
            <div className='flex gap-4'>
                <div className='flex-1 flex items-center'>
                    <Image
                        key={
                            pokemon?.sprites?.other?.home?.front_default ||
                            pokemon?.sprites?.front_default
                        }
                        src={
                            pokemon?.sprites?.other?.home?.front_default ||
                            pokemon?.sprites?.front_default ||
                            '/pokemon--logo.png'
                        }
                        alt='pokemon image'
                        width={200}
                        height={200}
                        className='object-contain'
                        priority
                    />
                </div>
                <div className='flex-1 flex flex-col items-center justify-center gap-4'>
                    <div className='mb-2 flex gap-2'>
                        <p className='text-xs uppercase font-semibold text-gray-500'>
                            {pokemon.height} m,
                        </p>
                        <p className='text-xs uppercase font-semibold text-gray-500'>
                            {pokemon.weight} kg,
                        </p>
                        <p className='text-xs uppercase font-semibold text-gray-500'>
                            {pokemon.base_experience} xp
                        </p>
                    </div>
                    <h2 className='text-2xl text-gray-800 capitalize font-bold text-center'>
                        {pokemon.name}
                    </h2>

                    <div className='flex justify-center gap-2'>
                        {pokemon.types.map((type, index) => (
                            <p
                                key={index}
                                className='text-xs uppercase font-semibold text-white px-5 py-1 rounded-full'
                                style={{
                                    backgroundColor: typeColor[type.type.name],
                                }}
                            >
                                {type.type.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
