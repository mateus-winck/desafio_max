/// <reference types="cypress" />



var faker = require('faker');



describe('desafio severest', () => {
   it('acessar o serverest', () => {
     
    //acessar o severest
    
    cy.visit('/home');

    //criando usuario

      let usuario={}
    usuario.nome=faker.name.findName();
    usuario.email=faker.internet.email();
    usuario.senha=faker.internet.password();
    
    cy.get('[data-testid=cadastrar]').click();
       cy.get('[data-testid=nome]').type(usuario.nome);
       cy.get('[data-testid=email]').type(usuario.email);
       cy.get('[data-testid=senha]').type(usuario.senha);
      
       cy.route('POST', '**/usuarios').as('postuser');

       cy.get('[data-testid=cadastrar]').click();

       cy.wait('@postuser').then((xhr) => {
        expect(xhr.status).be.eq(201);
        expect(xhr.response.body).has.property('message');
        expect(xhr.response.body.message).is.not.null;
       });
    
       // Adicionar um produto a Lista
      var nomeProduto; 
        cy.get(':nth-child(1) > .card-body > .card-title').then(($productname) => {
        nomeProduto = $productname.text();
        cy.log(nomeProduto);

        Cypress.env('nomeProduto', nomeProduto);
    
    })


    /* cy.get(':nth-child(1) > .card-body > :nth-child(5)').then(($preco) =>{
      Cypress.env('precoProduto', $preco.text())

    }) */

       cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid=adicionarNaLista]').click();
      
      //Validar a existência deste produto na Lista de Compras
      
      cy.contains(Cypress.env('nomeProduto').toString()).should('be.visible');
       
      cy.get('[data-testid=shopping-cart-product-quantity] > p').then(($numberProduct) => {
        expect($numberProduct.text()).be.eq('Total: 1');
      })
      
       
      /* cy.get('.card-body > :nth-child(2) > :nth-child(1)').then(($precoLista) => {
        expect($precoLista.text()).be.eq('Preço ' + Cypress.env('precoProduto'));
      }) */

    });

});