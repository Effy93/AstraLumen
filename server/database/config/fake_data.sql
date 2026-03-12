-- ==========================
-- Users
-- ==========================
INSERT INTO user (name, email, password, created_at) VALUES
('Alice', 'alice@example.com', 'hashed_password_1', 1677628800),
('Bob', 'bob@example.com', 'hashed_password_2', 1677715200),
('Charlie', 'charlie@example.com', 'hashed_password_3', 1677801600);

-- ==========================
-- Articles
-- ==========================
INSERT INTO article (title, content, created_at, user_id) VALUES
('Mon premier article', 'Contenu du premier article...', 1677628800, 1),
('Journal intime', 'Écrire mes pensées du jour...', 1677715200, 1),
('Réflexion philosophique', 'Aujourd’hui je réfléchis sur...', 1677801600, 1),
('Deuxième article Alice', 'Alice écrit encore...', 1677888000, 1);

-- ==========================
-- Statut moods
-- ==========================
INSERT INTO stat_mood (mood) VALUES
('Joie'),
('Tristesse'),
('Fatigue'),
('Stress'),
('Calme');

-- ==========================
-- Chrono sessions
-- ==========================
INSERT INTO chrono_session (timer_recorded, created_at, user_id) VALUES
(120, 1677628800, 1),
(90, 1677715200, 2),
(45, 1677801600, 3),
(30, 1677888000, 1);

-- ==========================
-- Timer sessions
-- ==========================
INSERT INTO timer_session (timer_recorded, created_at, user_id) VALUES
(15, 1677628800, 1),
(20, 1677715200, 2),
(25, 1677801600, 3),
(10, 1677888000, 1);

-- ==========================
-- User Mood Stats
-- ==========================
INSERT INTO user_stat_mood (user_id, stat_id) VALUES
(1, 1), -- Alice a eu "Joie"
(1, 5), -- Alice a eu "Calme"
(2, 2), -- Bob a eu "Tristesse"
(2, 4), -- Bob a eu "Stress"
(3, 3); -- Charlie a eu "Fatigue"