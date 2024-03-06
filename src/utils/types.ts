//Users
export type CreateUserParams = {
    firstName: string;
    lastName: string;
    role: number;
    email: string;
    password: string;
}

export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    role: number;
    email: string;
    password: string;
}

//Categorie
export type CreateCategorieParams = {
    designation: string;
}

export type UpdateCategorieParams = {
    designation: string;
}

//Produit
export type CreateProduitParams = {
    designation: string;
    prix: number;
    quantite: number;
    categorieId: number;
}

export type UpdateProduitParams = {
    designation: string;
    prix: number;
    quantite: number;
    categorieId: number;
}

//Panier
export type CreatePanierParams = {
    userId: number;
}

export type UpdatePanierParams = {
    userId: number;
}

//PanierProduit
export type CreatePanierProduitParams = {
    produitId: number;
    panierId: number;
    quantite: number;
}

export type UpdatePanierProduitParams = {
    produitId: number;
    panierId: number;
    quantite: number;
}
