describe('My First Test', () => {
  it('should visits the kitchen sink', () => {
    cy.visit('/');

    cy.findByRole('heading', {
      name: /Hello world/i,
    }).should('exist');
  });
});
