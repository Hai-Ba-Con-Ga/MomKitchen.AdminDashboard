import { useContext } from "react";
import FirebaseContext from "../store/context/FirebaseContext";


const useAuth = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}

export default useAuth