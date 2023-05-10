CREATE TABLE IF NOT EXISTS respositories(
    id serial primary key,
    name varchar(100),
    link text
); 

INSERT INTO respositories (name,link) VALUES('Identity-Management','https://raw.githubusercontent.com/jfandinoh/Identity-Management/main/IdentityServer/Program.cs');