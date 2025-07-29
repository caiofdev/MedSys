
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBoxProps {
    placeHolder: string
}

export default function SearchBox({ placeHolder }: SearchBoxProps) {
    return(
        <div className="w-full max-w-md">
            <label htmlFor="search" className="sr-only">Pesquisar</label>
            <div className="relative">
                <input
                    type="text"
                    id="search"
                    placeholder={placeHolder}
                    className="w-full rounded-2xl border border-neutral-300 bg-[#030D29] x-4 px-4 py-2 text-sm text-white"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 mr-1 text-white cursor-pointer">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>          
        </div>
    );
}