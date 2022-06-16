import xml.etree.ElementTree as ET
import os
tree = ET.parse('output/package/package.xml')
root = tree.getroot()
for types in tree.iterfind('{http://soap.sforce.com/2006/04/metadata}types'):
    if types.find('{http://soap.sforce.com/2006/04/metadata}name').text == 'LightningComponentBundle':
        f = open("JestTestsAux.txt", "a")
        for members in types.iterfind('{http://soap.sforce.com/2006/04/metadata}members'):
            f.write(members.text + ",")
        f.seek(-1, os.SEEK_END)
        f.truncate()
        f.close()