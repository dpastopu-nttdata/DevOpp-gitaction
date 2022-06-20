import xml.etree.ElementTree as ET
tree = ET.parse('output/package/package.xml')
root = tree.getroot()
count = 0
for types in tree.iterfind('{http://soap.sforce.com/2006/04/metadata}types'):
    if types.find('{http://soap.sforce.com/2006/04/metadata}name').text == 'ApexClass' or types.find('{http://soap.sforce.com/2006/04/metadata}name').text == 'ApexTrigger':
        f = open("TestClassAux.txt", "a")
        for members in types.iterfind('{http://soap.sforce.com/2006/04/metadata}members'):
            if "Test" in members.text:
                if count == 0:
                    f.write(members.text)
                else:
                    f.write("," + members.text)
                count=count+1
        f.close()
     