import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Panier } from './Panier';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 50 })
    firstName: string;

    @Column({ name: 'last_name', length: 50 })
    lastName: string;

    @Column({ name: 'role' })
    role: number;

    @Column({ name: 'email', length: 50, unique: true })
    email: string;

    @Column({ name: 'password', length: 50 })
    password: string;

    @OneToOne(() => Panier, panier => panier.user, { onDelete: "CASCADE" })
    panier: Panier;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}