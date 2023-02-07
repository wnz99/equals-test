describe('Contacts App', () => {
  it('should create a new contact version', () => {
    // Start from the index page
    cy.intercept(
      'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
      [
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
        {
          createdAt: new Date('2023-02-03T03:53:58.977Z'),
          name: 'Albert',
          avatar:
            'https://www.meme-arsenal.com/memes/3ee2c16ed2c4be36c7b10c89ed27ad13.jpg',
          email: 'aaa@aaa.com',
          phone: '23456789',
          birthday: '15/11/1963',
          id: '131',
        },
      ]
    )

    cy.visit('http://localhost:3000/')

    cy.contains('Go to Contacts SSR').click()

    cy.url().should('include', '/contacts')

    cy.get('h2').contains('Contacts')

    cy.contains('Albert')

    cy.contains('New Contact').click()

    cy.get('input[type=file]').selectFile('cypress/fixtures/avatar.jpg')

    cy.get('input[name="name"]').type('Dave')

    cy.get('input[name="email"]').type('dav@gmail.com')

    cy.get('input[name="phone"]').type('+44123456789')

    cy.get('input[name="birthday"]').type('01/01/1940')

    cy.intercept(
      'POST',
      'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts',
      'ok'
    )

    cy.contains('Save').click()
  })
})

export {}
