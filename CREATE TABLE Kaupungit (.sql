CREATE TABLE Kaupungit (
    KaupunkiID INT PRIMARY KEY,
    KaupunkiNimi VARCHAR(255)
);

CREATE TABLE Artistit (
    ArtistiID INT PRIMARY KEY,
    ArtistiNimi VARCHAR(255)
);

CREATE TABLE Festivaalit (
    FestivaaliID INT PRIMARY KEY,
    FestivaaliNimi VARCHAR(255),
    Paikka VARCHAR(255),
    Ajankohta DATE
);

CREATE TABLE Keikat (
    KeikkaID INT PRIMARY KEY,
    ArtistiID INT,
    FestivaaliID INT,
    KaupunkiID INT,
    FOREIGN KEY (ArtistiID) REFERENCES Artistit(ArtistiID),
    FOREIGN KEY (FestivaaliID) REFERENCES Festivaalit(FestivaaliID),
    FOREIGN KEY (KaupunkiID) REFERENCES Kaupungit(KaupunkiID)
);
