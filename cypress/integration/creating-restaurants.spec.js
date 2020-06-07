describe('Creating a Restaurant', () => {
  it('allows adding restaurants', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';
    cy.server({ force404: true });
    cy.route({
      method: 'GET',
      url:
        'https://api.outsidein.dev/u9RK4IcVq1ul4KuSwY9jVoIia70n1Z3D/restaurants',
      response: [],
    });

    cy.route({
      method: 'POST',
      url:
        'https://api.outsidein.dev/u9RK4IcVq1ul4KuSwY9jVoIia70n1Z3D/restaurants',
      response: {
        id: restaurantId,
        name: restaurantName,
      },
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('requestBody').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
