-- ============================================================
--   CREATION DE LA BASE TROUVE-TON-ARTISAN
-- ============================================================


-- Création de la base
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- ============================================================
--   TABLE : CATEGORIE
-- ============================================================

CREATE TABLE categorie (
  id_categorie   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_categorie  VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--   TABLE : SPECIALITE
-- ============================================================

CREATE TABLE specialite (
  id_specialite  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_specialite VARCHAR(100) NOT NULL,

  id_categorie   INT UNSIGNED NOT NULL,

  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (id_categorie)
    REFERENCES categorie(id_categorie)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--   TABLE : ARTISAN
-- ============================================================

CREATE TABLE artisan (
  id_artisan       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_artisan      VARCHAR(150) NOT NULL,
  note             DECIMAL(2,1) NULL,             -- ex : 4.5
  ville            VARCHAR(100) NOT NULL,
  site_web         VARCHAR(255) NULL,
  description      TEXT NULL,
  email_contact    VARCHAR(255) NOT NULL,
  artisan_du_mois  TINYINT(1) NOT NULL DEFAULT 0, -- 0 = non, 1 = oui

  id_specialite    INT UNSIGNED NOT NULL,

  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (id_specialite)
    REFERENCES specialite(id_specialite)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--   TABLE : MESSAGE_CONTACT
-- ============================================================

CREATE TABLE message_contact (
  id_message        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom_expediteur    VARCHAR(150) NOT NULL,
  email_expediteur  VARCHAR(255) NOT NULL,
  objet             VARCHAR(255) NOT NULL,
  contenu_message   TEXT NOT NULL,
  date_envoi        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  id_artisan        INT UNSIGNED NOT NULL,

  CONSTRAINT fk_message_artisan
    FOREIGN KEY (id_artisan)
    REFERENCES artisan(id_artisan)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- ============================================================