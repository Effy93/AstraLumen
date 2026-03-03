CREATE DATABASE IF NOT EXISTS astra_lumen;
USE astra_lumen;

CREATE TABLE stat_mood (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mood VARCHAR(55) NOT NULL
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at BIGINT NOT NULL
);

CREATE TABLE article (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(55) NOT NULL,
    content TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE chrono_session (
    id INT PRIMARY KEY  AUTO_INCREMENT NOT NULL,
    timer_recorded INT NOT NULL,
    created_at BIGINT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE timer_session (
    id  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    timer_recorded INT NOT NULL,
    created_at BIGINT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE user_stat_mood (
    user_id INT,
    stat_id INT,
    PRIMARY KEY (user_id, stat_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (stat_id) REFERENCES stat_mood(id)
);