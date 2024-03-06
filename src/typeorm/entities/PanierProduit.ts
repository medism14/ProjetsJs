import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Panier } from './Panier';
import { Produit } from './Produit';

@Entity({ name: 'panier_produits' })
export class PanierProduit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'produit_id' })
    produitId: number;

    @Column({ name: 'panier_id' })
    panierId: number;

    @Column({ name: 'quantite' })
    quantite: number;

    @ManyToOne(() => Panier, panier => panier.panierProduits)
    @JoinColumn({ name: 'panier_id' })
    panier: Panier;

    @OneToOne(() => Produit, produit => produit.panierProduit)
    @JoinColumn({ name: 'produit_id' })
    produit: Produit;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}