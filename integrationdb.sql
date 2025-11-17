USE trouve_ton_artisan;

-- ======================================
-- 1) INSERTIONS DES CATÉGORIES
-- ======================================
INSERT INTO categorie (id_categorie, nom_categorie) VALUES
  (1, 'Bâtiment'),
  (2, 'Services'),
  (3, 'Fabrication'),
  (4, 'Alimentation');

-- ======================================
-- 2) INSERTIONS DES SPÉCIALITÉS
-- ======================================
INSERT INTO specialite (id_specialite, nom_specialite, id_categorie) VALUES
  (1, 'Chauffagiste', 1),
  (2, 'Electricien', 1),
  (3, 'Menuisier', 1),
  (4, 'Plombier', 1),
  (5, 'Coiffeur', 2),
  (6, 'Fleuriste', 2),
  (7, 'Toiletteur', 2),
  (8, 'Webdesign', 2),
  (9, 'Bijoutier', 3),
  (10, 'Couturier', 3),
  (11, 'Ferronier', 3),
  (12, 'Boucher', 4),
  (13, 'Boulanger', 4),
  (14, 'Chocolatier', 4),
  (15, 'Traiteur', 4);

-- ======================================
-- 3) INSERTIONS DES ARTISANS
-- ======================================
INSERT INTO artisan (
  nom_artisan, note, ville, site_web, description,
  email_contact, artisan_du_mois, id_specialite
) VALUES
  ('Boucherie Dumont', 4.5, 'Lyon', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'boucherie.dumond@gmail.com', 0, 12),

  ('Au pain chaud', 4.8, 'Montélimar', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'aupainchaud@hotmail.com', 1, 13),

  ('Chocolaterie Labbé', 4.9, 'Lyon', 'https://chocolaterie-labbe.fr',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'chocolaterie-labbe@gmail.com', 1, 14),

  ('Traiteur Truchon', 4.1, 'Lyon', 'https://truchon-traiteur.fr',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'contact@truchon-traiteur.fr', 0, 15),

  ('Orville Salmons', 5.0, 'Evian', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'o-salmons@live.com', 1, 1),

  ('Mont Blanc Eléctricité', 4.5, 'Chamonix', 'https://mont-blanc-electricite.com',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'mont-blanc-electricite@gmail.com', 0, 2),

  ('Boutot & fils', 4.7, 'Bourg-en-bresse', 'https://boutot-menuiserie.com',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'boutot-fils@gmail.com', 0, 3),

  ('Vallis Bellemare', 4.0, 'Vienne', 'https://plomberie-bellemare.com',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'contact@vallisplomberie.com', 0, 4),

  ('Claude Quinn', 4.2, 'Aix-les-bains', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'claude.quinn@gmail.com', 0, 9),

  ('Amitee Lécuyer', 4.5, 'Annecy', 'https://lecuyer-couture.com',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'a.lecuyer@gmail.com', 0, 10),

  ('Ernest Carignan', 5.0, 'Le Puy-en-Velay', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'ernest.carignan@gmail.com', 0, 11),

  ('Royden Charbonneau', 3.8, 'Saint-Priest', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'royden.charbonneau@gmail.com', 0, 5),

  ('Leala Dennis', 3.8, 'Chambéry', 'https://coiffure-leala-chambery.fr',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'l.dennos@hotmail.fr', 0, 5),

  ('C''est sup''hair', 4.1, 'Romans-sur-Isère', 'https://sup-hair.fr',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'sup-hair@gmail.com', 0, 5),

  ('Le monde des fleurs', 4.6, 'Annonay', 'https://le-monde-des-fleurs-annonay.fr',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'contact@le-monde-des-fleurs-annonay.fr', 0, 6),

  ('Valérie Laderoute', 4.5, 'Valence', NULL,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'v-laredoute@gmail.com', 0, 7),

  ('CM Graphisme', 4.4, 'Valence', 'https://cm-graphisme.com',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'contact@cm-graphisme.com', 0, 8);
