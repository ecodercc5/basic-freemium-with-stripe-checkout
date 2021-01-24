import React from "react";
import { useAuth } from "../provider/AuthProvider";

export const Premium: React.FC = ({ children }) => {
  const { claims } = useAuth();

  return claims?.isPremium ? <>{children}</> : null;
};

export const NonPremium: React.FC = ({ children }) => {
  const { claims } = useAuth();

  return !claims?.isPremium ? <>{children}</> : null;
};
