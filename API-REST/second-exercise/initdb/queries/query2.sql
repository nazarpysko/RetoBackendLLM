-- Query 2: All jokes of the theme "humor negro"
SELECT j.text
FROM jokes j
JOIN themes t ON j.id_theme = t.id
WHERE t.theme = 'humor negro';
