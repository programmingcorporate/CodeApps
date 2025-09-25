import type { ReactNode } from 'react'
import { initialize } from '@pa-client/power-code-sdk'
import { useEffect } from 'react'

interface PowerProviderProps {
  children: ReactNode
}

const PowerProvider = ({ children }: PowerProviderProps) => {
  useEffect(() => {
    initialize();
  }, []);

  return <>{children}</>;
}

export default PowerProvider
