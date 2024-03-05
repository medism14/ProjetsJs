import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 50, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', length: 50, nullable: false })
    lastName: string;

    @Column({ name: 'role', nullable: false })
    role: number;

    @Column({ name: 'email', length: 50, unique: true, nullable: false })
    email: string;

    @Column({ name: 'password', length: 50, nullable: false })
    password: string;

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', nullable: false })
    updatedAt: Date;
}