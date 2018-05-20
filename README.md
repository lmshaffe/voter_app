**Getting the project up and running:**  
- Clone this repo.  
- Run: npm i  
- Add loc.env file under `config/env` (Must contain variables in schema.env)

**Uploading voter file**

Headerline (Make sure it's the first line in the file and that it's tabs and not spaces for mongoimport tsv):
> countyCode	voterId	lastName	suffixName	firstName	middleName	publicRecordExemption residentAddressLine1	residentAddressLine2	residentCity	residentState	residentZip mailingAddressLine1	mailingAddressLine2	mailingAddressLine3	mailingCity	mailingState	mailingZip mailingCountry	gender	race	birthDate	registrationDate	partyAffiliation	precinct	precinctGroup precinctSplit	precinctSuffix	voterStatus	congressionalDistrict	houseDistrict	senateDistrict countyCommissionDistrict	schoolBoardDistrict	areaCode	phoneNumber	phoneExtension	emailAddress

Example mongoimport statement:
```
mongoimport -h <host> -d <db_name> -c <collection_name> -u <user> -p <password> --ssl --authenticationDatabase admin --file <file_name> --type tsv --headerline
```
 
