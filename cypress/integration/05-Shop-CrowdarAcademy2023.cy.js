const { describe } = require("mocha");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Shop Page", () => {
  beforeEach(() => {
    cy.visit("https://practice.automationtesting.in/shop/");
  });
  it("Filtrar productos con precio entre $150 y $200", () => {
    // Encuentra el elemento del slider
    cy.get(".ui-slider-range").invoke("show");

    // Obtengo la posición del slider en relación con el ancho del elemento
    cy.get(".ui-slider-range").then(($range) => {
      const rangeWidth = $range.width();
      const minPrice = 150;
      const maxPrice = 200;
      const minPosition = Math.floor(rangeWidth * (minPrice / 1000));
      const maxPosition = Math.floor(rangeWidth * (maxPrice / 1000));

      // Establece la posición inicial y final del slider
      cy.get(".ui-slider-range").invoke("css","left", `${minPosition}px`);
      cy.get(".ui-slider-range").invoke("css","width",`${maxPosition - minPosition}px`
      );
      cy.get('.price_slider_amount > .button');
    
      // Agregar aserciones para verificar que los productos en el rango de precios correcto se muestren en los resultados.
    });

  });
  /* it('Filtrar productos por categoria Android exitoso', () => {
    cy.get('.cat-item-24 > a').click();
    cy.get('.woocommerce-breadcrumb')
      .invoke('text')
      .should('contain', 'Android');
  });
  
  it('Filtrar productos por categoria HTML exitoso', () => {
    cy.get('.cat-item-19 > a').click();
    cy.get('.woocommerce-breadcrumb')
      .invoke('text')
      .should('contain', 'HTML');
  });
  it('Filtrar productos por categoria Javascript exitoso', () => {
    cy.get('.cat-item-21 > a').click();
    cy.get('.woocommerce-breadcrumb')
      .invoke('text')
      .should('contain', 'JavaScript');
  });
  it('Filtrar productos por categoria selenium exitoso', () => {
    cy.get('.cat-item-17 > a').click();
    cy.get('.woocommerce-breadcrumb')
      .invoke('text')
      .should('contain', 'selenium');
  }); */
  //Categorias con un for each
  const categories = [
    { category: 'Android', selector: '.cat-item-24 > a' },
    { category: 'HTML', selector: '.cat-item-19 > a' },
    { category: 'JavaScript', selector: '.cat-item-21 > a' },
    { category: 'selenium', selector: '.cat-item-17 > a' }
  ];

  categories.forEach((category) => {
    it(`Filtrar productos por categoría ${category.category} exitoso`, () => {
      cy.get(category.selector).click();
      cy.get('.woocommerce-breadcrumb')
        .invoke('text')
        .should('contain', category.category);
    });
  });

  /* it("El usuario puede seleccionar la opción Sort by popularity del menu desplegable", () => {
    // Encuentra y hace clic en la opción deseada dentro del desplegable
    cy.get('.orderby').select("Sort by popularity");
    //Comprueba que la url contiene el parametro del ordenamiento
    cy.url().should('include','orderby=popularity');
  });
  it("El usuario puede seleccionar la opción Sort by newness del menu desplegable", () => {
    // Encuentra y hace clic en la opción deseada dentro del desplegable
    cy.get('.orderby').select("Sort by newness");
    //Comprueba que la url contiene el parametro del ordenamiento
    cy.url().should('include','orderby=newness');
  });
  it("El usuario puede seleccionar la opción Sort by price: low to high del menu desplegable", () => {
    // Encuentra y hace clic en la opción deseada dentro del desplegable
    cy.get('.orderby').select("Sort by price: low to high");
    //Comprueba que la url contiene el parametro del ordenamiento
    cy.url().should('include','orderby=price');
  });
  t("El usuario puede seleccionar la opción Sort by price: high to low del menu desplegable", () => {
    // Encuentra y hace clic en la opción deseada dentro del desplegable
    cy.get('.orderby').select("Sort by price: high to low");
    //Comprueba que la url contiene el parametro del ordenamiento
    cy.url().should('include','orderby=price-desc');
  }); */
  const opcionesOrdenamiento = [
    { opcion: "Sort by popularity", parametro: "popularity" },
    { opcion: "Sort by newness", parametro: "date" },
    { opcion: "Sort by average rating", parametro: "rating" },
    { opcion: "Sort by price: low to high", parametro: "price" },
    { opcion: "Sort by price: high to low", parametro: "price-desc" }
  ];
  //Se pone el tilde inclinado xq de esa forma toma como vble la opcion
  opcionesOrdenamiento.forEach((opcion) => {
    it(`El usuario puede seleccionar la opción ${opcion.opcion} del menú desplegable`, () => {
      // Encuentra y hace clic en la opción deseada dentro del desplegable
      cy.get('.orderby').select(opcion.opcion);
      // Comprueba que la URL contiene el parámetro del ordenamiento
      cy.url().should('include', `orderby=${opcion.parametro}`);
    });
  });
});
