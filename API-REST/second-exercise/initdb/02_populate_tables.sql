-- Populate users table
INSERT INTO users (username) VALUES
('Manolito'),
('Pepe'),
('Isabel'),
('Pedro');

-- Populate themes table
INSERT INTO themes (theme) VALUES
('humor negro'),
('humor amarillo'),
('chistes verdes');

-- Populate jokes table with one joke for each user and theme
-- Manolito
INSERT INTO jokes (text, id_username, id_theme) VALUES
('¿Sabes por qué no hay fantasmas en los cementerios? Porque tienen miedo de morir otra vez.', (SELECT id FROM users WHERE username = 'Manolito'), (SELECT id FROM themes WHERE theme = 'humor negro')),
('¿Cuál es el colmo de un electricista? Que le dé miedo la oscuridad.', (SELECT id FROM users WHERE username = 'Manolito'), (SELECT id FROM themes WHERE theme = 'humor amarillo')),
('¿Qué le dice un jardinero a otro? ¡Disfruta mientras puedas, porque esto se va a poner verde!', (SELECT id FROM users WHERE username = 'Manolito'), (SELECT id FROM themes WHERE theme = 'chistes verdes')),

-- Pepe
('¿Por qué las tumbas están siempre limpias? Porque ahí no hay quien deje huella.', (SELECT id FROM users WHERE username = 'Pepe'), (SELECT id FROM themes WHERE theme = 'humor negro')),
('¿Qué le dijo un pez a otro? ¡Nada, nada!', (SELECT id FROM users WHERE username = 'Pepe'), (SELECT id FROM themes WHERE theme = 'humor amarillo')),
('¿Sabes qué hacen las plantas cuando están tristes? Se echan a llorar verdes lágrimas.', (SELECT id FROM users WHERE username = 'Pepe'), (SELECT id FROM themes WHERE theme = 'chistes verdes')),

-- Isabel
('¿Qué le dijo el ataúd al muerto? ¡Espero que te guste tu nueva casa!', (SELECT id FROM users WHERE username = 'Isabel'), (SELECT id FROM themes WHERE theme = 'humor negro')),
('¿Cómo se llama un mago que no sabe magia? Un mago amarillo.', (SELECT id FROM users WHERE username = 'Isabel'), (SELECT id FROM themes WHERE theme = 'humor amarillo')),
('¿Qué le dijo el tomate a la lechuga en la cama? ¡No te preocupes, esto es solo un chiste verde!', (SELECT id FROM users WHERE username = 'Isabel'), (SELECT id FROM themes WHERE theme = 'chistes verdes')),

-- Pedro
('¿Sabes por qué los esqueletos no pelean entre ellos? Porque no tienen las entrañas para hacerlo.', (SELECT id FROM users WHERE username = 'Pedro'), (SELECT id FROM themes WHERE theme = 'humor negro')),
('¿Qué hace una abeja en el gimnasio? ¡Zum-ba!', (SELECT id FROM users WHERE username = 'Pedro'), (SELECT id FROM themes WHERE theme = 'humor amarillo')),
('¿Por qué los plátanos nunca se sienten solos? Porque siempre están en pareja verde.', (SELECT id FROM users WHERE username = 'Pedro'), (SELECT id FROM themes WHERE theme = 'chistes verdes'));