import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Research } from './Research'
import { User } from './User'

@Entity('researches_users')
class ResearchUser {
  @PrimaryColumn()
  readonly id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'research_id' })
  researchId: string;

  @ManyToOne(() => Research)
  @JoinColumn({ name: 'research_id' })
  research: Research

  @Column()
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor () {
    if (!this.id) { this.id = uuid() }
  }
}

export { ResearchUser }
