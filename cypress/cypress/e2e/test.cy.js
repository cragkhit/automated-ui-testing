describe('Test opening MDN using Chrome', () => {
  it('Search "WebDriver"', () => {
    cy.visit('https://developer.mozilla.org/en-US/') //go to MDN
    cy.title().should('eq', 'MDN Web Docs') // title should equal MDN Web Docs
    cy.get("#top-nav-search-input").type("WebDriver").type('{enter}') // type Cheese in search box and enter
    cy.title().should('eq', 'WebDriver | MDN') // Check the title
  })
})