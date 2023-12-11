import { expect, test } from "@playwright/test"; 
import { write } from "fs";



test('Comprando um Livro', async  ({page}) => {
    
const searchTerm = 'A vida pela Música'; // Declarei o livro que deve ser encontrado na caixa de pesquisa 
    
     

     // (a-b) Acessando a página inicial e verificando se a página está correta comparando o título com um valor 
          
             await  page.goto ('https://www.amazon.com.br/');
             await expect (await page.title()).toBe ('Amazon.com.br | Tudo pra você, de A a Z.'); 

      // (c-d)  Procurando um texto na caixa de pesquisa e verificando se a pagina está correta comparando com um valor no título 
 
             await page.fill('#twotabsearchtextbox', searchTerm); 
             await page.click ('input[type="submit"]'); 

             await expect (await page.title()).toBe ('Amazon.com.br : A vida pela Música'); 
             await page.waitForTimeout (1500);
 
      // (e-f)  Clicando no produto encontrado na lista de resultado e comparando o título da página(detalhes do produto) com um valor 
 
             await page.click ("[alt='A vida pela música']");
             await page.waitForTimeout (1500); // Eu precisei colocar este delay porque aqui a Amazon demorou um pouco para carregar, e isso estava fazendo o teste falhar. Caso precisar, é possivel remove-lo durante o teste.
             await expect (await page.title()).toBe ('A vida pela música | Amazon.com.br'); 
 
      //  (g-h) Adicionando o livro no carrinho de compras e comparando com valor esperado no título da página (carrinho de compras da Amazon)
             
             await page.click ("[id='add-to-cart-button']");
             await expect (await page.title()).toBe ('Carrinho de compras da Amazon.com'); 
             await page.waitForTimeout (1500);
    
      //  (i-j) Removendo o livro do carrinho de compras e verificando a página comparando o título com um valor esperado (carrinho vazio)

             await page.click ("[id='sw-gtc']");
             await page.waitForTimeout (1500);
 
             await page.click ("[aria-label='Excluir A vida pela m&uacute;sica']");
             await page.waitForTimeout (1500);
  
             await expect (await page.title()).toBe ('Carrinho de compras da Amazon.com'); 

      //   Fim do Teste

          });


