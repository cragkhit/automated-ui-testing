Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Test opening MDN using Chrome', () => {
  it('Search "WebDriver"', () => {
    cy.visit('https://developer.mozilla.org/en-US/') //go to MDN
    cy.title().should('eq', 'MDN Web Docs') // title should equal MDN Web Docs
    // type banana in search box and enter
    cy.get('#hp-search-input').type("banana").type('{enter}')
    cy.title().should('eq', 'Search: "banana"') // Check the title
  })
}) 