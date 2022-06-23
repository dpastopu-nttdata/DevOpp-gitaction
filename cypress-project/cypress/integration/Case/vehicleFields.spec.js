describe('Emergency Case MOB Test - Auto populate fields on informing "VIN" field.' 
+ 'Auto clear the fields on removing the "VIN" field', () =>{

  const caseNumberLabelSelector = '//article//h2[contains(@class,"inlineTitle slds-p-top--large slds-p-horizontal--medium slds-p-bottom--medium slds-text-heading--medium")]';


  var vehicleMOBEditSelector = "//*[text()='Fahrzeug MOB']/parent::span/following-sibling::div/div/div/div/a";
  var vehicleMOBOptionSelector = 'li[class="uiMenuItem uiRadioMenuItem"] > a[title="Ja"]';
  var editButtonSelector = '//slot[contains(@name, "actionsProvider")]/following-sibling::ul//button[contains(@name,"Edit")]';
  var vehicleVINSelector = '//input[contains(@placeholder, "Vehicles durchsuchen...")]';
  var brandNameSelector = "//*[text()='Fahrzeug Marke']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var modelSelector = "//*[text()='Fahrzeug Modell']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var mobEndDateSelector = "//*[text()='Fahrzeug MOB Enddatum']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var modelYearSelector = "//*[text()='Fahrzeug Modelljahr']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var vehicleOriginSelector = "//*[text()='Fahrzeug Importland']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var engineTypeSelector = "//*[text()='Fahrzeug Motortyp']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  var vehicleItemSelector = '//div[contains(@class, "slds-m-left--smalllabels slds-truncate slds-media__body")]//div[contains(@title, "VSSZZZVSZZZ7MZ8V5")]';
  var vehicleMOBReadOnlySelector = "//*[text()='Fahrzeug MOB']/parent::div/following-sibling::div/span/slot/slot/lightning-formatted-text";
  
  beforeEach(() =>{
    
        cy.login()
        cy.get('a[title="Vorgänge"]')
          .click({force:true})
          .wait(3000)
          
        cy.get('span>a[title="00346015"]')
          .click({multiple:false})

        cy.wait(3000)
        cy.scrollTo(0,1200)

        cy.xpath(brandNameSelector).as('VehicleBrand')
        cy.xpath(modelSelector).as('VehicleModel')
        cy.xpath(mobEndDateSelector).as('VehicleMOBEndDate')
        cy.xpath(modelYearSelector).as('VehicleModelYear')
        cy.xpath(vehicleOriginSelector).as('VehicleOrigin')
        cy.xpath(engineTypeSelector).as('VehicleEngineType')
        cy.xpath(vehicleMOBReadOnlySelector).as('VehicleMOB')
    })

    it('Enter the Vehicle VIN with valid MOB: "VSSZZZVSZZZ7MZ8V5"', () =>{ 
          
      cy.checkFieldsToBeEmpty('@VehicleBrand')
      cy.checkFieldsToBeEmpty('@VehicleModel')
      cy.checkFieldsToBeEmpty('@VehicleMOBEndDate')
      cy.checkFieldsToBeEmpty('@VehicleModelYear')
      cy.checkFieldsToBeEmpty('@VehicleOrigin')
      cy.checkFieldsToBeEmpty('@VehicleEngineType')

      cy.wait(2000)

      cy.xpath(editButtonSelector)
        .last()
        .click({force:true, multiple:false})
          

      cy.wait(2000)

      cy.xpath(caseNumberLabelSelector)
        .should('have.text', '00346015 bearbeiten')

      cy.xpath(vehicleVINSelector)
        .type('VSSZZZVSZZZ7MZ8V5', {force:true})
        
      cy.xpath(vehicleItemSelector)
        .click({force:true})
  
      cy.wait(3000)
        
      cy.get('button[title="Speichern"]')
        .should('exist', {force:true})
        .and('have.text', 'Speichern')
        .and('have.attr', 'class', 'slds-button slds-button--neutral uiButton--brand uiButton forceActionButton')
        .click({force:true})  
        
      cy.scrollTo(0, 1200)
  
      cy.wait(3000)

      cy.checkFieldsToBePopulated('@VehicleBrand')
      cy.checkFieldsToBePopulated('@VehicleModel')
      cy.checkFieldsToBePopulated('@VehicleMOBEndDate')
      cy.checkFieldsToBePopulated('@VehicleModelYear')
      cy.checkFieldsToBePopulated('@VehicleOrigin')
      cy.checkFieldsToBePopulated('@VehicleEngineType')

      cy.wait(3000)
    })

    it('Remove the value from the Vehicle VIN field', () =>{
      cy.scrollTo(0, 1200)

      cy.checkFieldsToBePopulated('@VehicleBrand')
      cy.checkFieldsToBePopulated('@VehicleModel')
      cy.checkFieldsToBePopulated('@VehicleMOBEndDate')
      cy.checkFieldsToBePopulated('@VehicleModelYear')
      cy.checkFieldsToBePopulated('@VehicleOrigin')
      cy.checkFieldsToBePopulated('@VehicleEngineType')

      cy.wait(3000)

      cy.xpath(editButtonSelector)
        .last()
        .click({force:true,multiple:false})
        
      cy.xpath(caseNumberLabelSelector)
        .should('have.text', '00346015 bearbeiten')

      cy.get('div:nth-child(1) > div > div > div > div > div > div.pillContainerWrapper.singlePill.noSeparator > div > ul > li:nth-child(1) > a > a > span.deleteIcon').as('deleteVINIcon')
        
      
      cy.get('@deleteVINIcon')
        .click({force:true})

      cy.get('button[title="Speichern"]')
        .should('exist', {force:true})
        .and('have.text', 'Speichern')
        .and('have.attr', 'class', 'slds-button slds-button--neutral uiButton--brand uiButton forceActionButton')
        .click({force:true})  

      cy.wait(3000)
      
      cy.scrollTo(0, 1250)

      cy.checkFieldsToBeEmpty('@VehicleBrand')
      cy.checkFieldsToBeEmpty('@VehicleModel')
      cy.checkFieldsToBeEmpty('@VehicleMOBEndDate')
      cy.checkFieldsToBeEmpty('@VehicleModelYear')
      cy.checkFieldsToBeEmpty('@VehicleOrigin')
      cy.checkFieldsToBeEmpty('@VehicleEngineType')
      cy.checkFieldsToBeEmpty('@VehicleMOB')
      
  })
  after(() => {
    cy.get('a[title="Vorgänge"]')
      .click({force:true})
      .wait(3000) 

    cy.get('span>a[title="00346015"]')
      .click({multiple:false})

    cy.xpath(editButtonSelector)
      .last()
      .click({force:true,multiple:false})
     

    cy.wait(2000)

    cy.xpath(caseNumberLabelSelector)
      .should('have.text', '00346015 bearbeiten')
    
    cy.selectFields(vehicleMOBEditSelector,vehicleMOBOptionSelector)

    cy.get('button[title="Speichern"]')
      .should('exist', {force:true})
      .and('have.text', 'Speichern')
      .and('have.attr', 'class', 'slds-button slds-button--neutral uiButton--brand uiButton forceActionButton')
      .click({force:true}) 
  })
})