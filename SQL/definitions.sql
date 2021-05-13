-- Dropping if Exists
DROP TABLE IF EXISTS Spice_Blends;
DROP TABLE IF EXISTS Household_Blends;
DROP TABLE IF EXISTS Household_Followings;
DROP TABLE IF EXISTS Spices;
DROP TABLE IF EXISTS Blends;
DROP TABLE IF EXISTS Members;
DROP TABLE IF EXISTS Households;

-- Main Tables
CREATE TABLE Households (
    HouseholdID INTEGER (20) AUTO_INCREMENT NOT NULL,
    AddressStreet INTEGER (10) NOT NULL,
    AddressCity VARCHAR (30) NOT NULL,
    AddressState VARCHAR (20) NOT NULL,
    AddressZip INTEGER(10) NOT NULL,
    CreationDate DATETIME NOT NULL,
    UserName VARCHAR (30) NOT NULL,
    Password VARCHAR (30) NOT NULL,
    
    PRIMARY KEY (HouseholdID)
);

CREATE TABLE Members (
    MemberID INTEGER (20) AUTO_INCREMENT NOT NULL,
    FirstName VARCHAR (30) NOT NULL,
    LastName VARCHAR (30) NOT NULL,
    MiddleName VARCHAR (30),
    HouseholdID INTEGER (20),

    PRIMARY KEY (MemberID),
    FOREIGN KEY (HouseholdID) REFERENCES Households(HouseholdID)
);

CREATE TABLE Blends (
    BlendID INTEGER (20) AUTO_INCREMENT NOT NULL,
    BlendName VARCHAR (30) NOT NULL,
    Quantity INTEGER (20),
    BlendDescription TEXT,

    PRIMARY KEY (BlendID)
);

CREATE TABLE Spices (
    SpiceID INTEGER (20) AUTO_INCREMENT NOT NULL,
    SpiceName VARCHAR (30) NOT NULL,
    SpiceDescription TEXT,

    PRIMARY KEY (SpiceID)
);

-- Relationship Tables
CREATE TABLE Household_Followings (
    HouseholdID_1 INTEGER (20),
    HouseholdID_2 INTEGER (20),

    FOREIGN KEY (HouseholdID_1) REFERENCES Households(HouseholdID),
    FOREIGN KEY (HouseholdID_2) REFERENCES Households(HouseholdID),
    PRIMARY KEY (HouseholdID_1, HouseholdID_2)
);

CREATE TABLE Household_Blends (
    HouseholdID INTEGER (20),
    BlendID INTEGER (20),

    FOREIGN KEY (HouseholdID) REFERENCES Households(HouseholdID),
    FOREIGN KEY (BlendID) REFERENCES Blends(BlendID),
    PRIMARY KEY (HouseholdID, BlendID)
);

CREATE TABLE Spice_Blends (
    BlendID INTEGER (20),
    SpiceID INTEGER (20),

    FOREIGN KEY (BlendID) REFERENCES Blends (BlendID),
    FOREIGN KEY (SpiceID) REFERENCES Spices (SpiceID),
    PRIMARY KEY (BlendID, SpiceID)
);

-- Inserting Sample Data
INSERT INTO Households (AddressStreet, AddressCity, AddressState, AddressZip, CreationDate, UserName, Password) VALUES
("14236 NW Jamestown RD", "Beaverton", "OR", 97206, 17/12/2015, "GoodBoy", "Password123"), 
("82931 SE Charleston DR", "Portland", "OR", 972229, 20/07/2006, "BadBoy", "231ILoveApples");

INSERT INTO Members (FirstName, MiddleName, LastName, HouseholdID) VALUES
("Steve", "P", "Nash", 1),
("Bob", "T", "Builder", 2);

INSERT INTO Spices (SpiceName, SpiceDescription) VALUES
("Paprica", "Very Delicious"),
("Pepper", "Generic Bland Spice"),
("Salt", "Makes things taste better"),
("Sugar", "Sweetness");

INSERT INTO Blends (BlendName, Quantity, BlendDescription) VALUES
("Salt-n-Sweet", 2, "This is a mixture of salt and sugar"),
("Pepper Daddy", 2, "Maximizing the pepper & salt flavors!");

INSERT INTO Household_Followings (HouseholdID_1, HouseholdID_2) VALUES
(1, 2);

INSERT INTO Spice_Blends (BlendID, SpiceID) VALUES
(1, 3), 
(1, 4),
(2, 2),
(2, 3);

INSERT INTO Household_Blends (HouseholdID, BlendID) VALUES
(1, 1),
(1, 2);
