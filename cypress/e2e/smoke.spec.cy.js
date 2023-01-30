import { CarrinhoPage } from "../support/pageObjects/carrinhoPage"
import { HomePage } from "../support/pageObjects/homePage"

describe('Smoke', () => {   

  context('Carrinho', () => {
    beforeEach(() => {
      cy.visit('https://qastoredesafio.lojaintegrada.com.br/')
    }) 
 
    it('Seleciona e retira múltiplas ofertas para verificar se o contador  mudou', () => {
        const homePage = new HomePage()

        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 1 Nível')
        homePage.adicionarOfertaNoCarrinho()
        
        
        const carrinhoPage = new CarrinhoPage()
        carrinhoPage.verificaContadorCarrinho(1)
        
        cy.get('.logo').click()
        

        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 2 Nível')
        homePage.adicionarOfertaNoCarrinho()
        
        carrinhoPage.verificaContadorCarrinho(2)
        
        carrinhoPage.retiraOfertaDoCarrinho('[CATEGORIA] Produto com categoria - 2 Nível')

        carrinhoPage.verificaContadorCarrinho(1)
    })

    it('Seleciona ofertas e calcula o valor total com as opcoes de fretes 1 dia útil e 2 dias úteis',  () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 1 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta("[CATEGORIA] Produto com categoria - 1 Nível", "R$ 80,00")

        //volta para home
        cy.get('.logo').click()
        //selciona outra oferta
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 2 Nível')
        homePage.adicionarOfertaNoCarrinho()

        
        carrinhoPage.verificaValorOferta("[CATEGORIA] Produto com categoria - 2 Nível","R$ 17,50")

        carrinhoPage.verificarSubtotal(97.5)

        carrinhoPage.adicionarCep("94950-490")

        carrinhoPage.verificaValorFrete('1 dia útil','R$ 0,00')
        carrinhoPage.selecionarOpcaoFrete('1 dia útil')
        carrinhoPage.verificaTotal(97.5)


        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')
        carrinhoPage.verificaTotal(132.61)
    })

    
    it('Seleciona e incrementa oferta para validar mudança no valor total do carrinho', () => {
      const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 1 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta("[CATEGORIA] Produto com categoria - 1 Nível", "R$ 80,00")

        //volta para home
        cy.get('.logo').click()
        //selciona outra oferta
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 2 Nível')
        homePage.adicionarOfertaNoCarrinho()

        
        carrinhoPage.verificaValorOferta("[CATEGORIA] Produto com categoria - 2 Nível","R$ 17,50")

        carrinhoPage.verificaTotal(97.5)

        carrinhoPage.incrementaOferta("[CATEGORIA] Produto com categoria - 2 Nível")

        carrinhoPage.verificaTotal(115)
    })


    
    it('Desconta o valor do frete da opcao "2 dias úteis" com cupom FRETEGRATIS', () => {
      const homePage = new HomePage();
      homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
      homePage.adicionarOfertaNoCarrinho()

      const carrinhoPage = new CarrinhoPage();
      carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

      carrinhoPage.adicionarCep("94950-490")
      carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
      carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

      carrinhoPage.verificarSubtotal(89.0)

      carrinhoPage.verificaTotal(124.11)

      carrinhoPage.adicionarCupom('FRETEGRATIS')

      carrinhoPage.verificaTotal(89.0)
    }) 
    it('Cupom FRETEGRATIS não deve alterar o valor do carrinho quando o frete for "1 dia útil"', () => {
      const homePage = new HomePage();
      homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
      homePage.adicionarOfertaNoCarrinho()

      const carrinhoPage = new CarrinhoPage();
      carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

      carrinhoPage.verificarSubtotal(89.0)

      carrinhoPage.adicionarCep("94950-490")
      carrinhoPage.verificaValorFrete('1 dia útil','R$ 0,00')
      carrinhoPage.selecionarOpcaoFrete('1 dia útil')

      carrinhoPage.verificaTotal(89.0)

      carrinhoPage.adicionarCupom('FRETEGRATIS')

      carrinhoPage.verificaTotal(89.0)

    })

    it('Cupom “10OFF” deve descontar 10%  na soma do valor das ofertas', () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

        carrinhoPage.adicionarCep("94950-490")
        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

        carrinhoPage.verificarSubtotal(89.0)
        carrinhoPage.verificaTotal(124.11)

        carrinhoPage.adicionarCupom('10OFF')

        carrinhoPage.verificaTotal(115.21)
    })
  
    it('Cupom 30REAIS deve dar 30 reais de desconto no valor total do carrinho', () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

        carrinhoPage.adicionarCep("94950-490")
        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

        carrinhoPage.verificarSubtotal(89.0)
        carrinhoPage.verificaTotal(124.11)

        carrinhoPage.adicionarCupom('30REAIS')

        carrinhoPage.verificaTotal(94.11)
    })


    it('Cupom “20LIMITADO” deve retornar erro “Cupom não encontrado“'
      , () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

        carrinhoPage.adicionarCep("94950-490")
        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

        carrinhoPage.verificarSubtotal(89.0)
        carrinhoPage.verificaTotal(124.11)

        carrinhoPage.adicionarCupom('20LIMITADO')

        carrinhoPage.verificaMensagemErro("Cupom não encontrado.")
        carrinhoPage.verificaTotal(124.11)
    })
    
    it('Cupom AJJFLWBHH deve descontar 5% no valor total do carrinho', () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

        carrinhoPage.adicionarCep("94950-490")
        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

        carrinhoPage.verificarSubtotal(89.0)
        carrinhoPage.verificaTotal(124.11)

        carrinhoPage.adicionarCupom('AJJFLWBHH')

        carrinhoPage.verificaTotal(117.90)
    })

    it('Cupom “CUPOMVENCIDO” deve retornar erro "O cupom não é válido."', () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

        carrinhoPage.adicionarCep("94950-490")
        carrinhoPage.verificaValorFrete('2 dias úteis','R$ 35,11')
        carrinhoPage.selecionarOpcaoFrete('2 dias úteis')

        carrinhoPage.verificarSubtotal(89.0)
        carrinhoPage.verificaTotal(124.11)

        carrinhoPage.adicionarCupom('CUPOMVENCIDO')

        carrinhoPage.verificaMensagemErro("O cupom não é válido.")
        carrinhoPage.verificaTotal(124.11)
    })
  }) 

})