type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  payload?: any;
}

type TokenSchema = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  }
} 

type PriceSchema = {
  currency: string;
  date: string;
  price: number;
}

type TokenListType = (PriceSchema & TokenSchema);