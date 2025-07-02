DROP TABLE IF EXISTS user CASCADE;

CREATE TABLE user(
    id SERIAL PRIMARY KEY, 
    email TEXT UNIQUE NOT NULL
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS trip CASCADE;

CREATE TABLE trip(
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by INT REFERENCES user(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS trip_members CASCADE;

CREATE TABLE trip_member(
    id SERIAL PRIMARY KEY, 
    user_email TEXT NOT NULL REFERENCES user(email),
    trip_id INT NOT NULL REFERENCES trip(id),
    created_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS event CASCADE;

CREATE TYPE eventstatus AS ENUM ('suggested', 'pending', 'confirmed', 'cancelled');
CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    location TEXT,
    date_time TIMESTAMP,
    status eventstatus,
    created_by TEXT REFERENCES user(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS task CASCADE;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    assigned_to TEXT REFERENCES user(email),
    complete BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES user(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE vote(
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES event(id),
    trip_id INT REFERENCES trip(id),
    vote_value BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES event(id),
    trip_id INT REFERENCES trip(id),
    user_id INT REFERENCES user(id),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
);

DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorite(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user(id),
    trip_id INT REFERENCES trip(id),
    created_at TIMESTAMP DEFAULT NOW(),
);