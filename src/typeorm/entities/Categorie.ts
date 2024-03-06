import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produit } from './Produit';

@Entity({ name: 'categories' })
export class Categorie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'designation', length: 255 })
    designation: string;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => Produit, produit => produit.categorie, { onDelete: "CASCADE" })
    produits: Produit[];

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}