export class HomePage{

    selecionarOferta(nomeOferta){
        cy.contains(nomeOferta).click({force: true});

        cy.printWithMessage(`Selecionou oferta [ ${nomeOferta} ]`  )
    }

    adicionarOfertaNoCarrinho(){
        cy.get('div.principal > .acoes-produto > .comprar > .botao').click()

        cy.printWithMessage("Adicionou oferta no carrinho")
    }
}