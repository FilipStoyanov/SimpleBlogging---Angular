export interface Key {
  name: string;
}
export interface Blog {
    id?: number;
    date: Date;
    title?: string;
    author?: string;
    description?: string;
    tags?: string[];
    image: string;
    status: string;
};
