import dynamic from "next/dynamic";
import React from "react";

export function createClientDynamic<T extends React.ComponentType<any>>(importer: () => Promise<{ default: T }>) {
  return dynamic(importer, { ssr: false });
}
