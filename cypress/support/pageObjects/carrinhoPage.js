import Utils from "../Utils"

export class CarrinhoPage{

    verificaContadorCarrinho = (numeroEsperado) => {
        cy.get('.span4 > .carrinho > :nth-child(1) > .qtd-carrinho').should('have.text',numeroEsperado)

        cy.addContext(`Contador do carrinho esta conforme o esperado  - [ ${numeroEsperado} ]`)
    }

    retiraOfertaDoCarrinho = (oferta) => {
        cy.get('div').find('a')
        .filter(`:contains("${oferta}")`)
        .parents('td')
        .nextAll()
        .find('> .excluir')
        .click()

        cy.printWithMessage(`Oferta [ ${oferta} ] foi retirada do carrinho`)
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

            cy.printWithMessage(`Valor da oferta ${nomeOferta} retornou conforme o esperado [ ${valor} ]`)
        })
    }

    verificarSubtotal = (valorEsperado) => {
        cy.get('.subtotal > .titulo').then($el => {
            let subtotal = $el.text()
            subtotal = Utils.limpaFormatacaoReal(subtotal)
            cy.log(subtotal)


            expect(subtotal).to.equal(valorEsperado)

            cy.addContext(`Valor do subtotal retornou conforme o esperado - [ ${valorEsperado} ]`)
        })
    }

    verificaTotal = (valorEsperado) => {
        cy.get('.total > .titulo').then($el => {
            let total = $el.text()
            total = Utils.limpaFormatacaoReal(total)
            cy.log(total)

            expect(total).to.equal(valorEsperado)
            cy.printWithMessage(`Valor do subtotal retornou conforme o esperado - [ ${valorEsperado} ]`)
        })
    }

    adicionarCep = (cep) => {
        cy.get('#calcularFrete').type(cep).should('have.value', cep)

        cy.get('#btn-frete').click()

        cy.addContext(`Adicionou cep [ ${cep} ]`)
    }

    verificaValorFrete = (opcao, valorEsperado) => {

        cy.get('[name=formaEnvio]').next().filter(`:contains("${opcao}")`).next()
            .invoke('text').then($el => {
                let valorFrete = $el

                cy.log(valorFrete)
    
                expect(valorFrete).be.equal(valorEsperado)  

                cy.addContext(`Valor da opcao [ ${opcao} ]  do frete  retornou conforme o esperado - [ ${valorEsperado} ]`)
            })
    }

    selecionarOpcaoFrete = (opcao) => {
        cy.get('[name=formaEnvio]')
            .next()
            .filter(`:contains("${opcao}")`)
            .prev()
            .click()

            cy.get('.valor-loading',{timeout: 10000}).should('not.exist');

            cy.printWithMessage(`Selecionou a opcao [ ${opcao} ]`)
    }

    adicionarCupom = (cupom) => {
        cy.get('#usarCupom').type(cupom).should('have.value', cupom)

        cy.get('#btn-cupom').click()

        cy.printWithMessage(`Ativou o cupom [ ${cupom} ]`)
    }

    verificaMensagemErro = (erro) => {
        cy.get('.alert-danger').then($el => {
            let text = $el.text()
            text = text.replace("×","").trim()
            cy.log(text)

            expect(text).to.equal(erro)

            cy.printWithMessage(`Apareceu mensagem de erro - [ ${erro} ]`)
        })
    }

    clicarIrAsCompras = () => {
        cy.contains('Ir às compras').click()
    }

    verificaValorDoCupom = (valorEsperado) => {
        cy.get('#cupom_desconto').invoke('text').then($el => {
            let text = $el
            expect(text.trim()).to.equal(valorEsperado)

            cy.addContext(`Valor do cupom retornou como esperado - [ ${valorEsperado} ]`)
        })
    }

    decrementarOferta = (nomeOferta) => {
        cy.get('div').find('a')
        .filter(':contains('+nomeOferta+')')
        .parents('td')
        .nextAll()
        .find('> form > .quantidade > .icon-minus')
        .click()

        cy.printWithMessage(`Oferta [ ${nomeOferta} ] foi decrementada`)
    }

    incrementaOferta = (nomeOferta) => {
        cy.get('div').find('a')
        .filter(':contains('+nomeOferta+')')
        .parents('td')
        .nextAll()
        .find('> form > .quantidade > .icon-plus')
        .click()

        cy.printWithMessage(`Oferta [ ${nomeOferta} ] foi incrementada`)
    }
}