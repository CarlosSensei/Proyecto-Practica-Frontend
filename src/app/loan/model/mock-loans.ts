import { PaginatedData } from '../../core/page/PaginatedData';
import { Loan } from './Loan';

export const LOAN_DATA: PaginatedData<Loan> = {
    content: [
        {id: 1, client: { id: 1, name: 'John Doe' }, game: { id: 1, title: 'Game 1', age: 18, category: { id: 1, name: 'Action' }, author: { id: 1, name: 'Author 1', nationality: 'USA' } }, loanDate: '2023-01-01', returnDate: '2023-01-15'},
        {id: 2, client: { id: 2, name: 'Jane Smith' }, game: { id: 2, title: 'Game 2', age: 16, category: { id: 2, name: 'Adventure' }, author: { id: 2, name: 'Author 2', nationality: 'Canada' } }, loanDate: '2023-02-01', returnDate: '2023-02-15'},
        {id: 3, client: { id: 3, name: 'Bob Johnson' }, game: { id: 3, title: 'Game 3', age: 20, category: { id: 3, name: 'Strategy' }, author: { id: 3, name: 'Author 3', nationality: 'UK' } }, loanDate: '2023-03-01', returnDate: '2023-03-15'},
        {id: 4, client: { id: 4, name: 'Alice Brown' }, game: { id: 4, title: 'Game 4', age: 12, category: { id: 4, name: 'Puzzle' }, author: { id: 4, name: 'Author 4', nationality: 'Germany' } }, loanDate: '2023-04-01', returnDate: '2023-04-15'},
        {id: 5, client: { id: 5, name: 'Charlie Davis' }, game: { id: 5, title: 'Game 5', age: 14, category: { id: 5, name: 'Racing' }, author: { id: 5, name: 'Author 5', nationality: 'France' } }, loanDate: '2023-05-01', returnDate: '2023-05-15'},
        {id: 6, client: { id: 6, name: 'Eve Wilson' }, game: { id: 6, title: 'Game 6', age: 10, category: { id: 6, name: 'Sports' }, author: { id: 6, name: 'Author 6', nationality: 'Italy' } }, loanDate: '2023-06-01', returnDate: '2023-06-15'},
    ],

    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 6,
};