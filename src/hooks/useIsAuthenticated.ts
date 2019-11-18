import { useState, useEffect } from "react";
import { AuthService } from "../api/auth.service";

export const useIsAuthenticated = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const setAuthentication = async () => {
          try {
            const result = await AuthService.isAuthenticated();
            setIsAuthenticated(result);
          } catch (e) {
            setIsAuthenticated(false);
          }
        };
        setAuthentication();
    }, []);
    
    return isAuthenticated;
};
