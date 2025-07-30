import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
}

export default function Pagination({ links, currentPage, lastPage, total, perPage }: PaginationProps) {
    if (lastPage <= 1) return null;

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    return (
        <div className="flex items-center justify-center px-4 py-6 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {/* Mobile view */}
                {links[0]?.url && (
                    <Link
                        href={links[0].url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Anterior
                    </Link>
                )}
                {links[links.length - 1]?.url && (
                    <Link
                        href={links[links.length - 1].url!}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Próximo
                    </Link>
                )}
            </div>
            
            <div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-4">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {/* Previous button */}
                        {links[0]?.url ? (
                            <Link
                                href={links[0].url}
                                className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors"
                            >
                                <span className="sr-only">Anterior</span>
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300">
                                <ChevronLeft className="h-5 w-5" />
                            </span>
                        )}

                        {/* Page numbers */}
                        {links.slice(1, -1).map((link, index) => {
                            if (!link.url && link.label === '...') {
                                return (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors ${
                                        link.active 
                                            ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            : 'bg-white text-gray-900'
                                    }`}
                                    aria-current={link.active ? 'page' : undefined}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="relative inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300"
                                >
                                    {link.label}
                                </span>
                            );
                        })}

                        {/* Next button */}
                        {links[links.length - 1]?.url ? (
                            <Link
                                href={links[links.length - 1].url!}
                                className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors"
                            >
                                <span className="sr-only">Próximo</span>
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300">
                                <ChevronRight className="h-5 w-5" />
                            </span>
                        )}
                    </nav>
                </div>
                
                <div>
                    <p className="text-sm text-gray-600">
                        Mostrando{' '}
                        <span className="font-medium">{startItem}</span>{' '}
                        até{' '}
                        <span className="font-medium">{endItem}</span>{' '}
                        de{' '}
                        <span className="font-medium">{total}</span>{' '}
                        resultados
                    </p>
                </div>
            </div>
        </div>
    );
}
