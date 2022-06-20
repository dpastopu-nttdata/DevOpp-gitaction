trigger AccountTrigger on  Account (after insert, after update ) {
    if (trigger.isAfter) {
        for (account acc: Trigger.new) {
            if (acc.textField__c == 'xxx') {
                acc.textField__c = 'yyy';
            }    
        }
    }
}