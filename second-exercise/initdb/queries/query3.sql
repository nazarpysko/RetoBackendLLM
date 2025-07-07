-- Query 3: All jokes of the theme "humor negro" created by "Manolito"
SELECT j.text
FROM jokes j
JOIN users u ON j.id_username = u.id
JOIN themes t ON j.id_theme = t.id
WHERE u.username = 'Manolito' AND t.theme = 'humor negro';
