describe('Creating a Restaurant', () => {
  it('allows adding restaurants', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';
    cy.server({ force404: true });
    cy.route({
      method: 'GET',
      url:
        'https://outside-in-dev-api.herokuapp.com/Asa1yPGao9bjYoRk0qeTzaQ91tCb6Y8H/restaurants',
      response: [],
    });

    cy.route({
      method: 'POST',
      url:
        'https://outside-in-dev-api.herokuapp.com/Asa1yPGao9bjYoRk0qeTzaQ91tCb6Y8H/restaurants',
      response: {
        id: restaurantId,
        name: restaurantName,
      },
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Restaurant Name"').type(restaurantName);
    cy.get('[data-testid="new-restaurant-submit-button"]').click();

    cy.wait('@addRestaurant').its('requestBody').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
