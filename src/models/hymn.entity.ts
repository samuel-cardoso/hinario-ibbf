export interface HymnProps {
  id: number;
  title: string;
  lyrics: string;
}

/** Um hino do Cantor Cristão. `id` é o número do hino no hinário impresso. */
export class Hymn {
  constructor(private readonly props: HymnProps) {}

  get id(): number {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get lyrics(): string {
    return this.props.lyrics;
  }

  toJSON() {
    return { id: this.props.id, title: this.props.title, lyrics: this.props.lyrics };
  }
}
