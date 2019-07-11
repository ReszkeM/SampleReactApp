import DebtListItem from './models/debtListItem';

export const testTopDebts: DebtListItem[] = [
  {
    id: 1,
    address: 'address1',
    documentType: 'doc1',
    name: 'Jan Kowalski',
    nip: '1111',
    number: 11,
    price: 10,
    value: 1000
  },
  {
    id: 2,
    address: 'address2',
    documentType: 'doc2',
    name: 'Adam Nowak',
    nip: '2222',
    number: 22,
    price: 20,
    value: 2000
  },
  {
    id: 3,
    address: 'address3',
    documentType: 'doc3',
    name: 'Zygmunt Bułka',
    nip: '3333',
    number: 33,
    price: 30,
    value: 3000
  }
];
