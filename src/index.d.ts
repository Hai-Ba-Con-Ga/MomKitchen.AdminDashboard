declare module 'remoteApp/Button' {
    import { ReactNode } from 'react';
  
    interface ComponentProps {
        name : string
    }
  
    const Button: React.FC<ComponentProps>;
    export default Button;
  }