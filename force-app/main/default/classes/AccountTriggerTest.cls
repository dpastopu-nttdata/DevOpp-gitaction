@isTest
private with sharing class AccountTriggerTest {

	static TestMethod void testInsertAcc() {
		Account acc1 = new account();
        acc1.textField__c = 'xxxx';
        acc1.name = 'test name';

        Test.startTest();
            Database.SaveResult result = Database.insert(acc1, true);
        Test.stopTest();
		
	}
}

