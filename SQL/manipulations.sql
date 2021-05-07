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



-- UPDATE QUERIES FOR UPDATING A ROW IN TABLES



-- DELETE QUERIES FOR DELETING A ROW IN TABLES
