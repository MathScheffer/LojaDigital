// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import addContext from 'mochawesome/addContext';

Cypress.Commands.add('addContext', (context) => {
    cy.once('test:after:run', (test) => addContext({test}, context))
});

Cypress.Commands.add('printWithMessage', (message) => {
    cy.screenshot(message);

    let Imagem = Cypress.spec.name
    let path = "\\cypress\\screenshots\\" + Imagem + "\\"  + message + '.png';

    cy.once('test:after:run', (test) => addContext({test}, message))
    cy.once('test:after:run', (test) => addContext({test}, path)) 
})

Cypress.on("test:after:run", (test, runnable) => {  
	if (test.state === "failed") {    
		const screenshot =`\\cypress\\screenshots\\${Cypress.spec.name}\\${runnable.parent.title} -- ${test.title} (failed) (attempt 2).png`;    
		addContext({ test }, screenshot);  
	}
});
