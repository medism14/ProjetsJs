import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Categorie } from './Categorie';
import { PanierProduit } from './PanierProduit';

@Entity({ name: 'produits' })
export class Produit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'date_in', type: 'date', default: () => 'CURRENT_DATE' })
    dateIn: Date;

    @Column({ name: 'date_up', type: 'date', default: () => 'CURRENT_DATE' })
    dateUp: Date;

    @Column({ name: 'designation', length: 255 })
    designation: string;

    @Column({ name: 'prix' })
    prix: number;

    @Column({ name: 'quantite' })
    quantite: number;

    @Column({ name: 'categorie_id' })
    categorieId: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    //Relation avec categorie
    @JoinColumn({ name: 'categorie_id' })
    @ManyToOne(() => Categorie, categorie => categorie.produits)
    categorie: Categorie;

    //Relation avec panier Produit
    @OneToMany(() => PanierProduit, panierProduit => panierProduit.produit, { onDelete: "CASCADE" })
    panierProduit: PanierProduit[];

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
