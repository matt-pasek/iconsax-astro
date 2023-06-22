declare module '*.astro' {
  const value: {
    (props: { style?: string; color?: string; size?: number | string; title?: string }): any;
  };
  export default value;
}
