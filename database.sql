CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "challenge" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80),
	"description" VARCHAR (2400)
);

CREATE TABLE "submission" (
	"id" SERIAL PRIMARY KEY,
	"user" INT REFERENCES "user",
	"challenge" INT REFERENCES "challenge", 
	"image_url" VARCHAR (240)
);
