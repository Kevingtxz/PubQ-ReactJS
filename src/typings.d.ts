declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
    }
  }
}

declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png" {
  interface IImage {
    url: string;
  }
  const image: IImage;
  export = image;
}
