import DebtListItem from './models/debtListItem';

export const testTopDebts: DebtListItem[] = [
  {
    Id: 1,
    Address: 'address1',
    DocumentType: 'doc1',
    Name: 'Jan Kowalski',
    NIP: '1111',
    Number: 11,
    Price: 10,
    Value: 1000
  },
  {
    Id: 2,
    Address: 'address2',
    DocumentType: 'doc2',
    Name: 'Adam Nowak',
    NIP: '2222',
    Number: 22,
    Price: 20,
    Value: 2000
  },
  {
    Id: 3,
    Address: 'address3',
    DocumentType: 'doc3',
    Name: 'Zygmunt Bułka',
    NIP: '3333',
    Number: 33,
    Price: 30,
    Value: 3000
  }
];
