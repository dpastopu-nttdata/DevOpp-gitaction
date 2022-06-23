/// <reference types="cypress" />
describe('New Emergency Case.', () => {
  var newSelector = 'div[title="Neu"]';
  
  var caseOriginSelector = '(//div[contains(@class,"uiInput uiInputSelect forceInputPicklist uiInput--default uiInput--select")]//a)[1]';
  var caseOriginOptionSelector = 'div[class="select-options"]>ul>li>a[title="Kunde"]';
  
  var categorySelector = '(//div[contains(@class,"uiInput uiInputSelect forceInputPicklist uiInput--default uiInput--select")]//a)[2]';
  var categoryOptionSelector = 'div[class="select-options"]>ul>li>a[title="Panne"]';

  var mainCategoryBreakdownSelector = '(//div[contains(@class,"uiInput uiInputSelect forceInputPicklist uiInput--default uiInput--select")]//a)[3]';
  var mainCategoryBreakdownOptionSelector = 'div[class="select-options"]>ul>li>a[title="Elektrik"]';

  var at_Home_AbroadSelector = '(//div[contains(@class,"uiInput uiInputSelect forceInputPicklist uiInput--default uiInput--select")]//a)[4]';
  var at_Home_AbroadOptionSelector = 'div[class="select-options"]>ul>li>a[title="Inland"]';

  var subCategoryBreakdownSelector = '(//div[contains(@class,"uiInput uiInputSelect forceInputPicklist uiInput--default uiInput--select")]//a)[5]';
  var subCategoryBreakdownOptionSelector = 'div[class="select-options"]>ul>li>a[title="Beleuchtung defekt"]';

  var countrySelector = '(//a[contains(text(),"Deutschland")])[1]';

  var vehicleMOBSelector = '//div/section/div/div[2]/div/div/div/div[1]/div/article/div[3]/div/div[3]/div/div/div[5]/div[1]/div/div/div/div/div/div/div/a';
  var vehicleMOBOptionSelector = 'div[class="select-options"]>ul>li>a[title="Ja"]';

  var statusSelector = '(//a[contains(text(),"In Bearbeitung")])';
  var statusOptionSelector = 'div[class="select-options"]>ul>li>a[title="In Bearbeitung"]';

  var saveBtnSelector = 'button[title="Speichern"]';

  var locationBreakdownSelector = '(//div[5]/div[1]/div/div/div/input)[2]';
  var licenseVehiclePlateSelector = '(//div[contains(@class,"uiInput uiInputText uiInput--default uiInput--input")]//input)[6]';

  var recoveryCallSelector = 'li[class="slds-var-p-horizontal_medium slds-var-p-vertical_xx-small desktop forceImageRelatedListStencil forceRecordLayout"]';

  beforeEach(() =>{
    cy.login()
    cy.get('a[title="Vorgänge"]')
      .click({force:true})
      .wait(3000)
      
    cy.newOBjectItem(newSelector)
    cy.selectType('input[value="0122X000000cnBmQAI"]')
    cy.clickNext('button.slds-button.slds-button--neutral.slds-button.slds-button_brand.uiButton  > span[dir="ltr"]')
    
    cy.wait(8000)

    cy.selectFields(caseOriginSelector, caseOriginOptionSelector)
    cy.selectFields(categorySelector,categoryOptionSelector)
    cy.selectFields(mainCategoryBreakdownSelector,mainCategoryBreakdownOptionSelector)
    cy.selectFields(subCategoryBreakdownSelector,subCategoryBreakdownOptionSelector)
    cy.selectFields(at_Home_AbroadSelector,at_Home_AbroadOptionSelector)
    cy.selectFields(vehicleMOBSelector,vehicleMOBOptionSelector)
    cy.selectFields(statusSelector,statusOptionSelector)
    
    cy.xpath(countrySelector)
      .should('have.text', 'Deutschland')
  })
  it.only('Creating a new Emergency Case with validation rules fields informed.', () => {
    
      cy.xpath(locationBreakdownSelector)
        .should('be.empty')
        .type('Bad Nauheim, Frankfurter Stasse 103')
        .should('have.value', 'Bad Nauheim, Frankfurter Stasse 103')

      cy.xpath(licenseVehiclePlateSelector)
        .should('be.empty')
        .type('FB-ED-294')
        .should('have.value', 'FB-ED-294')
      
      cy.saveObject(saveBtnSelector)
      
      cy.wait(10000)

      cy.scrollTo(300,500)

      cy.wait(4000)

      cy.get(recoveryCallSelector)
        .should('be.visible')

      cy.getSObject(__dirname).then((value) =>{
        const SObject = value
        let SObjectId;
          cy.log(SObject)
          cy.url()
            .then(url =>{
              SObjectId = url.split(SObject+'/')[1].split('/view')[0]

              cy.writeFile('./recordData.json', {"SObject" : SObject, "Id" : SObjectId})
              
              cy.readFile('./recordData.json').then((file) =>{
                var path = require('path')
                cy.log(path.dirname(file))
              })
              cy.log("The SObject is: " + SObject + " and its SObjectId is: " + SObjectId)
          })           
      })
 })
 it('Creating a new Emergency Case without validation rules fields informed.', () => {
    
  cy.saveObject(saveBtnSelector)

  cy.get('span[class="genericError uiOutputText"]')
    .should('have.text', 'Überprüfen Sie die Fehler auf dieser Seite.')

  cy.get('ul[class="errorsList"]>li')
    .eq(0)
    .should('have.text', 'Bitte für die Pannenlokation eine der folgenden Informationen ergänzen: wenn die Panne im Inland aufgetreten ist muss entweder "Panne an Heimatanschrift?", "Pannen-Standort" oder "Geolocation" angegeben werden. Wenn die Panne im Ausland aufgetreten ist, dann bitte Standort angeben.')
  
  cy.get('ul[class="errorsList"]>li')
    .eq(1)
    .should('have.text', 'Bitte geben Sie das Fahrzeugkennzeichen ein.')
  })
})
