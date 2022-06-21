trigger AccountTrigger on  Account (after insert, after update ) {
    if (trigger.isAfter) {
        for (account acc: Trigger.new) {
            if (acc.textField__c == 'xxx') {
                system.debug('+++ Text Field 2 ' + acc.textField__c);
            }    
        }
    }
}