DROP TABLE IF EXISTS favorite CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS trip_member CASCADE;
DROP TABLE IF EXISTS trip CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trip(
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE trip_member(
    id SERIAL PRIMARY KEY, 
    user_email TEXT NOT NULL REFERENCES users(email),
    trip_id INTEGER NOT NULL REFERENCES trip(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    location TEXT,
    date_time TIMESTAMP,
    status TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trip(id),
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    assigned_to TEXT REFERENCES users(email),
    complete BOOLEAN DEFAULT false,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vote(
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES event(id),
    trip_id INTEGER REFERENCES trip(id),
    vote_value BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES event(id),
    trip_id INTEGER REFERENCES trip(id),
    user_id INTEGER REFERENCES users(id),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE favorite(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    trip_id INTEGER REFERENCES trip(id),
    created_at TIMESTAMP DEFAULT NOW()
);