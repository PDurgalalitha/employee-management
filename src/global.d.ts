declare module "*.css";
declare module "*.ts";
declare module "*.tsx";
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}