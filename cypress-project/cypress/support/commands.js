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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

var iframeXpath= '//*[@id="setupComponent"]/div[2]/div/force-aloha-page/div/iframe';

Cypress.Commands.add('login', () =>{
   cy.exec('sfdx force:org:display -u userAgent --json')
    .then((response) => {
      var responseString = JSON.stringify(response).replace(/\\u001b\[[0-9]{1,3}m(\\n)?/g, "").replace(/\s/g,"")
      var responseParse = JSON.parse(responseString)
      let result = JSON.parse(responseParse.stdout).result
      let sessionId = result.accessToken;
      let instanceUrl = result.instanceUrl;
   
      cy.request(`${instanceUrl}/secur/frontdoor.jsp?sid=${sessionId}`).should('have.property', 'status', 200)
      cy.visit(`${instanceUrl +"/lightning/o/Case/list?filterName=Recent"}`)

      cy.wait(5000)
    })
})

Cypress.Commands.add('newOBjectItem', (newBtnSelector) => {
            cy.get(newBtnSelector)
              .should('be.visible')
              .click({force:true})
})
Cypress.Commands.add('selectType', (typeSelector) => {
  cy.get(typeSelector)
    .as('typeSelector')
      
  cy.get('@typeSelector')
    .check({force:true})
  
})

Cypress.Commands.add('clickNext', (nextBtnSelector) => {
  cy.get(nextBtnSelector)
    .as('nextButton')
      
  cy.get('@nextButton')
    .should('be.visible')
    .and('have.text', 'Weiter')  
    .click()
  
})

Cypress.Commands.add('selectFields', (pickListSelector, option) => {
    cy.xpath(pickListSelector)
      .as('pickList')
        
      cy.get('@pickList')
      .click({force:true})

      cy.get(option)
        .click({force:true})
        .should('not.be.null')
    
})

Cypress.Commands.add('saveObject', (saveBtnSelector) => {
  cy.get(saveBtnSelector)
    .as('saveButton')
      
  cy.get('@saveButton')
    .should('be.visible')
    .and('have.text', 'Speichern')  
    .click()

  cy.wait(3000)
})

Cypress.Commands.add('switchToIframe', (iframe) =>{
  return cy
    .xpath(iframe)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap)
})

Cypress.Commands.add('checkFieldsToBeEmpty', (fieldSelector) => {
  cy.get(fieldSelector)
    .should('be.empty')
    .then(($field) => {
     cy.log($field.val())
   })
   .wait(500)
})

Cypress.Commands.add('checkFieldsToBePopulated', (fieldSelector) => {
 cy.get(fieldSelector)
   .should('not.be.empty')
   .then(($field) => {
     cy.log('The field has been populated with: ' + $field.val())
   })
   .wait(500)
})

Cypress.Commands.add('getSObjectId', (SObjectPassed) => {
  const SObject = SObjectPassed;
  let SObjectId;
  cy.log(SObject)
  cy.url()
    .then(url =>{
      SObjectId = url.split(SObject+'/')[1].split('/view')[0]
      return SObjectId
  })
})

Cypress.Commands.add('getSObject', (dirName) =>{
    var fullPath = dirName; 
    var path = fullPath.split('/'); 
    var SObject = path[path.length-1];

    return SObject
})