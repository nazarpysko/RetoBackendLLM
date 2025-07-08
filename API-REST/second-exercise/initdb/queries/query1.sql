-- Query 1: All jokes created by "Manolito"
SELECT j.text
FROM jokes j
JOIN users u ON j.id_username = u.id
WHERE u.username = 'Manolito';
