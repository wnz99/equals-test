import nock from 'nock'

import { apiClient } from './apiClient'

// Intentionally testing only one method to save time
describe('apiClientV2', () => {
  it('should return contacts', async () => {
    const expectedContacts = [
      {
        createdAt: new Date('2023-02-03T03:53:58.977Z'),
        name: 'Sassy Michelle',
        avatar:
          'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
        email: 'sassy@email.com',
        phone: '23456789',
        birthday: '15/11/1963',
        id: '130',
      },
    ]

    nock('https://61c32f169cfb8f0017a3e9f4.mockapi.io:443', {
      encodedQueryParams: true,
    })
      .get('/api/v1/contacts')
      .reply(
        200,
        [
          {
            createdAt: '2023-02-03T03:53:58.977Z',
            name: 'Sassy Michelle',
            avatar:
              'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
            email: 'sassy@email.com',
            phone: '23456789',
            birthday: '15/11/1963',
            id: '130',
          },
        ],
        ['Access-Control-Allow-Origin', '*']
      )

    const contacts = await apiClient.getContacts()

    expect(contacts).toEqual(expectedContacts)
  })

  it('should degrade gracefully if birthday is in invalid format in contacts', async () => {
    const expectedContacts = [
      {
        createdAt: new Date('2023-02-03T03:53:58.977Z'),
        name: 'Sassy Michelle',
        avatar:
          'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
        email: 'sassy@email.com',
        phone: '23456789',
        birthday: null,
        id: '130',
      },
    ]

    nock('https://61c32f169cfb8f0017a3e9f4.mockapi.io:443', {
      encodedQueryParams: true,
    })
      .get('/api/v1/contacts')
      .reply(
        200,
        [
          {
            createdAt: '2023-02-03T03:53:58.977Z',
            name: 'Sassy Michelle',
            avatar:
              'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
            email: 'sassy@email.com',
            phone: '23456789',
            birthday: '',
            id: '130',
          },
        ],
        ['Access-Control-Allow-Origin', '*']
      )

    const contacts = await apiClient.getContacts()

    expect(contacts).toEqual(expectedContacts)
  })
})
