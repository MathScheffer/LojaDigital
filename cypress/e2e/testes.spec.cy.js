import { CarrinhoPage } from "../support/pageObjects/carrinhoPage"
import { HomePage } from "../support/pageObjects/homePage"
import Utils from "../support/Utils"

describe('Aceite', () => {   


  context('Carrinho', () => {
    beforeEach(() => {
      cy.visit('https://qastoredesafio.lojaintegrada.com.br/')
    }) 

         it('Seleciona e retira multiplas ofertas para verificar se o contador  mudou', () => {
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

        it('Seleciona ofertas e calcula o valor total',  () => {
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
      }) 

        it('Verifica se o cupom 10OFF descontou 10%', () => {
          const homePage = new HomePage();
          homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
          homePage.adicionarOfertaNoCarrinho()

          const carrinhoPage = new CarrinhoPage();
          carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')

          carrinhoPage.verificarSubtotal(89.0)

          carrinhoPage.verificaTotal(89.0)

          carrinhoPage.adicionarCupom('10OFF')

          carrinhoPage.verificaTotal(80.1)
      })
      



    }) 

})