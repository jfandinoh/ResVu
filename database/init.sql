CREATE TABLE IF NOT EXISTS repositories(
    id serial primary key,
    name varchar(100),
    link text
); 

INSERT INTO repositories (name,link) VALUES('Identity-Management','https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs');


CREATE TABLE IF NOT EXISTS scanRepositories(
    id serial primary key,
    idRespository int,
    status varchar(25),
    repositoryName varchar(100),
    repositoryUrl text,
    Findings text,
    QueuedAt timestamp,
    ScanningAt timestamp,
    FinishedAt timestamp
); 