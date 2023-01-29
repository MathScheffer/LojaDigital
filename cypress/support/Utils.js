export default class Utils {
    static limpaFormatacaoReal(numero){
        return parseFloat(numero.replace("R$","").replace(",",".").trim())
    }
}