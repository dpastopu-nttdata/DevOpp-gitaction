describe('Emergency Case SEAT Partner Search - Pre requisites: Emergency Case with "Location Breakdown" created.', () =>{
    
  var seatPartnerSucheSelector = '//*[@id="customTab__item"]';
  var sucheInputSelector = '(//div[contains(@class, "slds-form-element__control slds-grow slds-input-has-icon slds-input-has-icon_left-right")]//input[contains(@name, "input")])[2]';
  var dealerAccountSelector = '//force-highlights-details-item[4]//a';
  var dealerMapMarkerSelector = '(//li[contains(@class, "slds-coordinates__item")]//lightning-primitive-icon)[5]';
  var accountEditSelector = "//button[contains(@title,'"+ '"SEAT Partner Account"'+ " bearbeiten')]";
  var accountDeleteIconSelector = '//button[contains(@title,"Auswahl löschen")]//lightning-primitive-icon';
  var saveButtonSelector = '//lightning-button[contains(@class,"footer-button save-button")]// button[contains(@title,"Speichern")]';
  before(() =>{
      cy.login()
      cy.get('a[title="Vorgänge"]')
        .click({force:true})
      
      cy.wait(3000) 

      cy.get('span>a[title="00346015"]')
        .click({multiple:false})
  })
  it('Assign Partner through the Map',() =>{
      cy.wait(3000)
        
      cy.xpath(seatPartnerSucheSelector)
        .last()
        .should('exist')
        .and('have.text', 'SEAT Partner Suche')
        .click({force:true,multiple:false})
      
      cy.wait(2000)

      cy.xpath(sucheInputSelector)
        .should('exist')
        .and('have.value','Bad Nauheim, Frankfurter Stasse 103')

      cy.xpath(dealerAccountSelector)
        .should('not.exist')

      cy.scrollTo(0,600)

      cy.wait(6000)

      cy.xpath(dealerMapMarkerSelector)
        .should('exist')
        .click({force:true})
        
      cy.wait(2000)

      cy.xpath('//c-emergency-service-partners-l-w-c//div[contains(@class, "slds-modal__content slds-p-around_medium")]')
        .should('exist')
      
      cy.xpath('//c-emergency-service-partners-l-w-c//div[contains(@class, "slds-modal__content slds-p-around_medium")]//a[contains(text(), "Partner zuweisen")]')
        .click({force:true})
        
      cy.wait(3000)

      cy.on('window:alert', (txt) =>{
        expect(txt).to.contains('Erfolgreich zugewiesen!');
        cy.confirm()
      })

      cy.wait(4000)
  })
  after(() =>{
    cy.get('a[title="Vorgänge"]')
      .click({force:true})

    cy.get('span>a[title="00346015"]')
      .click({force:true},{multiple:false})

    cy.wait(5000)

    cy.xpath(dealerAccountSelector)
      .should('not.be.empty')

    cy.xpath(accountEditSelector)
      .click({force:true},  {multiple:false})

    cy.xpath(accountDeleteIconSelector)
      .click({force:true})

    cy.xpath(saveButtonSelector)
      .should('exist', {force:true})
      .and('have.text', 'Speichern')
      .and('have.attr', 'class', 'slds-button slds-button_brand')
      .click({force:true})  
    
    cy.xpath(dealerAccountSelector)
      .should('not.exist')
  })
})