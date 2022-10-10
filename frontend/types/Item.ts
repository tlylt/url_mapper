export type Item = {
  fromUrl: string;
  toUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: String;
};

export type CreateItem = {
  fromUrl?: string;
  toUrl: string;
};
