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
    FOREIGN KEY (SpicesID) REFERENCES Spices (SpicesID),
    PRIMARY KEY (BlendID, SpicesID)
);

