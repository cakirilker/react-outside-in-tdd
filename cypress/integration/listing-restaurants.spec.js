describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';
    cy.server({ force404: true });
    cy.route({
      method: 'GET',
      url:
        'https://api.outsidein.dev/u9RK4IcVq1ul4KuSwY9jVoIia70n1Z3D/restaurants',
      response: [
        {
          id: 1,
          name: sushiPlace,
        },
        {
          id: 2,
          name: pizzaPlace,
        },
      ],
    });
    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
