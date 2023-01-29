export class HomePage{

    selecionarOferta(nomeOferta){
        cy.contains(nomeOferta).click({force: true});
    }

    adicionarOfertaNoCarrinho(){
        cy.get('div.principal > .acoes-produto > .comprar > .botao').click()
    }
}