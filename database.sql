CREATE TABLE "user"
(
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"team" INT REFERENCES "team"
);

CREATE TABLE "challenge"
(
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (2400)
);

CREATE TABLE "submission"
(
	"id" SERIAL PRIMARY KEY,
	"user" INT REFERENCES "user",
	"challenge_id" INT REFERENCES "challenge",
	"image_url" VARCHAR (240),
	"status" INT REFERENCES "status",
	"team_id" INT REFERENCES "team"
);

CREATE TABLE "team"
(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80)
);

CREATE TABLE "status"
(
	"id" SERIAL PRIMARY KEY,
	"status_name" VARCHAR(16)
);

