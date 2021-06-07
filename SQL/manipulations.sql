-- SELECT QUERIES TO READ TABLES IN FULL

-- Query to get every column from Households table
SELECT * FROM Households;

-- Query to get every column from Members table
SELECT * FROM Members;

-- Query to get every column from Blends table
SELECT * FROM Blends;

-- Query to get every column from Spices table
SELECT * FROM Spices;

-- Query to get every column from Household_Blends table
SELECT * FROM Household_Blends;

-- Query to get every column from Household_Followings table
SELECT * FROM Household_Followings;

-- Query to get every column from Spice_Blends table
SELECT * FROM Spice_Blends;

-- SELECT QUERIES FOR READING TABLES IN SEARCH

-- Query to get every row from Households table that has one column match the input
-- :input is variable from search bar
SELECT * FROM Households WHERE
:search in (HouseholdID, AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password);

-- Query to get every row from Members table that has one column match the input
-- :input is variable from search bar
SELECT * FROM Members WHERE
:search in (MemberID, FirstName, MiddleName, LastName, HouseholdID);

-- Query to get every row from Blends table that has one column match the input
-- :input is variable from search bar
SELECT * FROM Blends WHERE
:search in (BlendID, BlendName, Quantity, BlendDescription)s;

-- Query to get every row from Spices table that has one column match the input
-- :input is variable from search bar
SELECT * FROM Spices WHERE
:search in (SpiceID, SpiceName, SpiceDescription);


-- INSERT QUERIES FOR ADDING A NEW ROW TO TABLES

-- Query to insert row into Households table with input variables
-- Variables from input form are :strInput, :cityInput, :staInput, :zipInput, :dateInput, :nameInput, :passInput
INSERT INTO Households (AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password) VALUES
(:strInput, :cityInput, :staInput, :zipInput, STR_TO_DATE(:dateInput, '%m/%d/%Y'), :nameInput, :passInput);

-- Query to insert row into Members table with input variables
-- Variables from input form are :fnInput, :mnInput, :lnInput, :housID
INSERT INTO Members (FirstName, MiddleName, LastName, HouseholdID) VALUES
(:fnInput, :mnInput, :lnInput, :housID);

-- Query to insert row into Spices table with input variables
-- Variables from input form are :nInput, :desInput
INSERT INTO Spices (SpiceName, SpiceDescription) VALUES
(:nInput, :desInput);

-- Query to insert row into Blends table with input variables
-- Variables from input form are :nInput, :qInput, desInput
INSERT INTO Blends (BlendName, Quantity, BlendDescription) VALUES
(:nInput, :qInput, :desInput);

-- Query to insert row into Household_Followings table with input variables
-- Variables from input form are :idInputOne, :idInputTwo
INSERT INTO Household_Followings (HouseholdID_1, HouseholdID_2) VALUES
(:idInputOne, :idInputTwo);

-- Query to insert row into Spice_Blends table with input variables
-- Variables from input form are :bidInput, :sidInput
INSERT INTO Spice_Blends (BlendID, SpiceID) VALUES
(:bidInput, :sidInput);

-- Query to insert row into Household_Blends table with input variables
-- Variables from input form are :hidInput, :bidInput
INSERT INTO Household_Blends (HouseholdID, BlendID) VALUES
(:hidInput, :bidInput);

-- UPDATE QUERIES FOR UPDATING A ROW IN TABLES

-- Query to update row of Households table with input variables
-- Variables from input form are :strInput, :cityInput, :staInput, :zipInput, :dateInput, :nameInput, :passInput, :hid
UPDATE Households SET
AddressStreet = :strInput,
AddressCity = :cityInput,
AddressState = :staInput,
AddressZip = :zipInput,
UserName = :nameInput,
Password = :passInput
WHERE HouseholdID = :hid;

-- Query to update row of Members table with input variables
-- Variables from input form are :fnInput, :mnInput, :lnInput, :housID, :mid
UPDATE Members SET
FirstName = :fnInput,
MiddleName = :mnInput,
LastName = :lnInput,
HouseholdID = :housID
WHERE MemberID = :mid;

-- Query to update row of Spices table with input variables
-- Variables from input form are :nInput, :desInput, :sid
UPDATE Spices SET
SpiceName = :nInput,
SpiceDescription = :desInput
WHERE SpiceID = :sid;

-- Query to update row of Blends table with input variables
-- Variables from input form are :nInput, :qInput, desInput, :bid
UPDATE Blends SET
BlendName = :nInput,
Quantity = :qInput,
BlendDescription = :desInput
WHERE BlendID = :bid;

-- DELETE QUERIES FOR DELETING A ROW IN TABLES

-- Query to delete row in Households table where ID matches input
-- :id is input to match ID
DELETE FROM Households WHERE HouseholdID = :id;

-- Query to delete row in Members table where ID matches input
-- :id is input to match ID
DELETE FROM Members WHERE MemberID = :id;

-- Query to delete row in Spices table where ID matches input
-- :id is input to match ID
DELETE FROM Spices WHERE SpiceID = :id;

-- Query to delete row in Blends table where ID matches input
-- :id is input to match ID
DELETE FROM Blends WHERE BlendID = :id;
