DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    email TEXT UNITQUE NOT NULL
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE trips(
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by TEXT REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
);

DROP TABLE IF EXISTS trip_members CASCADE;

CREATE TABLE trip_members(
    id SERIAL PRIMARY KEY, 
    user_email TEXT NOT NULL REFERENCES users(email),
    trip_id INT NOT NULL REFERENCES trip(id),
    created_at TIMESTAMP,
);

DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    location TEXT,
    date_time TIMESTAMP,
    status TEXT,
    created_by TEXT REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
);

DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    assigned_to TEXT REFERENCES users(email),
    complete BOOLEAN,
    created_by TEXT REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
);

DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    trip_id INT REFERENCES trip(id),
    vote_value BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
);

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    trip_id INT REFERENCES trip(id),
    user_id INT REFERENCES users(id),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP,
);

DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    trip_id INT REFERENCES trip(id),
    created_at TIMESTAMP,
);