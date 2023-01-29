import Utils from "../Utils"

export class CarrinhoPage{

    verificaContadorCarrinho = (numeroEsperado) => {
        cy.get('.span4 > .carrinho > :nth-child(1) > .qtd-carrinho').should('have.text',numeroEsperado)
    }

    retiraOfertaDoCarrinho = (oferta) => {
        cy.get('div').find('a')
        .filter(`:contains("${oferta}")`)
        .parents('td')
        .nextAll()
        .find('> .excluir')
        .click()
    }
    verificaValorOferta = (nomeOferta, valor) => {
        cy.get('div').find('a')
            .filter(':contains('+nomeOferta+')')
            .parents('td')
            .nextAll()
            .find('> .preco-produto').eq(1).invoke('text').as('text')

        cy.get('@text').then($text => {
            const txt = $text.trim()

            cy.log(txt)
            console.log(txt)
            expect(txt).to.be.equal(valor)
        })
    }

    verificarSubtotal = (valorEsperado) => {
        cy.get('.subtotal > .titulo').then($el => {
            let subtotal = $el.text()
            subtotal = Utils.limpaFormatacaoReal(subtotal)
            cy.log(subtotal)


            expect(subtotal).to.equal(valorEsperado)
        })
    }

    verificaTotal = (valorEsperado) => {
        cy.get('.total > .titulo').then($el => {
            let total = $el.text()
            total = Utils.limpaFormatacaoReal(total)
            cy.log(total)

            expect(total).to.equal(valorEsperado)
        })
    }

    adicionarCupom = (cupom) => {
        cy.get('#usarCupom').type(cupom).should('have.value', cupom)

        cy.get('#btn-cupom').click()
    }
}