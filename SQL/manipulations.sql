-- SELECT QUERIES TO READ TABLES IN FULL

--
SELECT * FROM Households;

--
SELECT * FROM Members;

--
SELECT * FROM Blends;

--
SELECT * FROM Spices;

--
SELECT * FROM Household_Blends;

--
SELECT * FROM Household_Followings;

--
SELECT * FROM Spice_Blends;

-- SELECT QUERIES FOR READING TABLES IN SEARCH

--
--
SELECT * FROM Households WHERE
HouseholdID == :input OR
AddressStreet == :input OR
AddressCity == :input OR
AddressState == :input OR
AddressZip == :input OR
CreationDate == :input OR
UserName == :input OR
Password == :input;

--
--
SELECT * FROM Members WHERE
MemberID == :input OR
FirstName == :input OR
MiddleName == :input OR
LastName == :input OR
HouseholdID == :input;

--
--
SELECT * FROM Blends WHERE
BlendID == :input OR
BlendName == :input OR
Quantity == :input OR
BlendDescription == :input;

--
--
SELECT * FROM Spices WHERE
SpiceID == :input OR
SpiceName == :input OR
SpiceDescription == :input;


-- INSERT QUERIES FOR ADDING A NEW ROW TO TABLES

--
--
INSERT INTO Households (AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password) VALUES
(:strInput, :cityInput, :staInput, :zipInput, :dateInput, :nameInput, :passInput);

--
--
INSERT INTO Members (FirstName, MiddleName, LastName, HouseholdID) VALUES
(:fnInput, :mnInput, :lnInput, :housID);

--
--
INSERT INTO Spices (SpiceName, SpiceDescription) VALUES
(:nInput, :desInput);

--
--
INSERT INTO Blends (BlendName, Quantity, BlendDescription) VALUES
(:nInput, :qInput, desInput);

--
--
INSERT INTO Household_Followings (HouseholdID_1, HouseholdID_2) VALUES
(:idInputOne, :idInputTwo);

--
--
INSERT INTO Spice_Blends (BlendID, SpiceID) VALUES
(:bidInput, :sidInput);

--
--
INSERT INTO Household_Blends (HouseholdID, BlendID) VALUES
(:hidInput, :bidInput);

-- UPDATE QUERIES FOR UPDATING A ROW IN TABLES

--
-- 
UPDATE Households SET
AddressStreet = :strInput,
AddressCity = :cityInput,
AddressState = :staInput,
AddressZip = :zipInput,
CreationDate = :dateInput,
UserName = :nameInput,
Password = :passInput
WHERE HouseholdID = :hid;

--
--
UPDATE Members SET
FirstName = :fnInput,
MiddleName = :mnInput,
LastName = :lnInput,
HouseholdID = :housID
WHERE MemberID = :mid;

--
--
UPDATE Spices SET
SpiceName = :nInput,
SpiceDescription = :desInput
WHERE SpiceID = :sid;

--
--
UPDATE Blends SET
BlendName = :nInput,
Quantity = :qInput,
BlendDescription = :desInput
WHERE BlendID = :bid;

-- DELETE QUERIES FOR DELETING A ROW IN TABLES

--
--
DELETE FROM Households WHERE HouseholdID == :id;

--
--
DELETE FROM Members WHERE MemberID == :id;

--
--
DELETE FROM Spices WHERE SpiceID == :id;

--
--
DELETE FROM Blends WHERE BlendID == :id;
