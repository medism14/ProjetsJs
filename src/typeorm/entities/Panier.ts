import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { PanierProduit } from './PanierProduit';

@Entity({ name: 'paniers' })
export class Panier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @OneToOne(() => User, user => user.panier)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => PanierProduit, panierProduit => panierProduit.panier, { onDelete: "CASCADE" })
    panierProduits: PanierProduit[];

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}