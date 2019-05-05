#Update Collection Fields

#1. db.PinCode.updateMany( {}, { $rename: { "officename": "office_name", "pincode": "pin_code", "officeType": "office_type", "Deliverystatus": "delivery_status", "divisionname": "division_name", "regionname": "region_name", "circlename": "circle_name", "Taluk": "taluk", "Districtname": "district_name","statename": "state_name", "Telephone": "telephone","relatedSuboffice": "related_sub_office","relatedHeadoffice": "related_head_office"} } )

#2.db.Partner.updateMany( {}, { $rename: { "manager": "hb_relation"} } )

#3.sudo npm rebuild node-sass --force --unsafe-perm=true

#4. Start Local Database: sudo mongod --dbpath /Users/hostbooks/Desktop/database/data/db

#5. mongoimport -h ds133275.mlab.com:33275 -d channel-partner -c PinCode -u hostbooks -p hostbooks1234 --file PinCode.json

#6. mongoimport -h localhost:27017 -d channel-partner -c PinCode -u -p --file PinCode.json

#7. mongoexport - h localhost: 27017 - d channel - partner - c Lead - o Lead.json



Author 

Amit Dubey

