import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      border: string;
      error: string;
      link: string;
    };
    breakpoint: {
      mobile: string;
      tablet: string;
      desktop: string;
      smallerThanDesktop: string;
      raw: {
        mobile: number;
        desktop: number;
      };
    };
  }
}
