## Info
<p style="font-bold text-white">Il faut tout d'abord commencer par changer les informations de la base de donnée dans /backend/src/app.module.ts</p>
<p style="font-bold text-white">Le backend est lancé sur le port 3000 à voir dans /backend/src/main.ts</p>
<p style="font-bold text-white">La creation de table et le MRD sont disponible ci-dessous</p>

##
## Database:
##

## Users:
<pre>CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(50),
last_name VARCHAR(50),
role INT NOT NULL CHECK (role IN (0, 1)),
email VARCHAR(50) UNIQUE,
password VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</pre>

## Categories:
<pre>CREATE TABLE categories (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
designation VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</pre>

## Produits:
<pre>CREATE TABLE produits (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
date_in DATE NOT NULL,
date_up DATE NOT NULL,
designation VARCHAR(255) NOT NULL,
prix DECIMAL(10,2) NOT NULL,
quantite INT NOT NULL,
categorie_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (categorie_id) REFERENCES categories (id)
);</pre>

## Paniers:
<pre>CREATE TABLE paniers (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users (id)
);</pre>

## PanierProduits:
<pre>CREATE TABLE panier_produits (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
produit_id INT NOT NULL,
panier_id INT NOT NULL,
quantite INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (produit_id) REFERENCES produits (id),
FOREIGN KEY (panier_id) REFERENCES paniers (id)
);</pre>

## MRD:
<pre>
-users (id, first_name, last_name, role, email, password, created_at, updated_at)

-categories (id, designation, created_at, updated_at)

-produits (id, date_in, date_up, designation, prix, quantite, categorie_id, created_at, updated_at)

-paniers (id, user_id, created_at, updated_at)

-panier_produits (id, produit_id, panier_id, quantite, created_at, updated_at)
</pre>