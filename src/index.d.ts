declare module "remoteApp/Button" {
  interface ComponentProps {
    name: string;
  }

  const Button: React.FC<ComponentProps>;
  export default Button;
}
