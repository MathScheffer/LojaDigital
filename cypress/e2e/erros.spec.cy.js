import { CarrinhoPage } from "../support/pageObjects/carrinhoPage"
import { HomePage } from "../support/pageObjects/homePage"

describe('Aceite', () => {   

context('Comportamentos inesperados', () => {
    beforeEach(() => {
      cy.visit('https://qastoredesafio.lojaintegrada.com.br/')
    }) 
 
    it('Cupom para de valer quando excluo todas as ofertas do carrinho e adiciono novas sem retirar o cupom antes', () => {
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

        carrinhoPage.retiraOfertaDoCarrinho('[CATEGORIA] Produto com categoria - 3 Nível')
        carrinhoPage.clicarIrAsCompras()

        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        carrinhoPage.verificaValorDoCupom("R$ 0,00")

        carrinhoPage.verificaTotal(124.11)
    })
    
    it('Mensagem de erro lançada após decrementar oferta com somente 1 unidade', () => {
        const homePage = new HomePage();
        homePage.selecionarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        homePage.adicionarOfertaNoCarrinho()

        const carrinhoPage = new CarrinhoPage();
        carrinhoPage.verificaValorOferta('[CATEGORIA] Produto com categoria - 3 Nível', 'R$ 89,00')
        carrinhoPage.decrementarOferta('[CATEGORIA] Produto com categoria - 3 Nível')
        carrinhoPage.verificaMensagemErro("Erro ao atualizar item.")
    })
  }) 

})