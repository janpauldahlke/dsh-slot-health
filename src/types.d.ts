/**
 * Ambient type shims for the harness host/client packages.
 *
 * Out-of-tree plugins reference host types via type-only imports that only
 * resolve inside the real harness. Declaring a minimal surface here lets
 * `tsc --noEmit` type-check our own code (esbuild erases these type imports).
 * Same pattern as dsh-agent-processes.
 */
declare module '@deepseek-ai/cordis' {
  import type { WebServerRoute } from '@deepseek-ai/dsh-host-webserver'
  export interface SlotKey {
    name: string
    key?: string
    id?: string
    order?: number
  }
  export interface Context {
    tools: {
      register: (def: Record<string, unknown>) => () => void
    }
    slots: {
      inject: (name: string, factory: () => unknown) => () => void
      register: (key: SlotKey, render: unknown) => () => void
    }
    // Present on webServer-injected contexts; typed here (non-optional) so the
    // nested `ctx.inject(['webServer'], …)` callback mirrors long-horizon's.
    webServer: {
      register: (route: WebServerRoute) => () => void
    }
    sidebarRight: {
      openTab: (kind: string) => void
    }
    sidebarRightTabs: {
      register: (def: object) => () => void
    }
    effect: (dispose: () => void, tag?: string) => void
    inject: (deps: string[], fn: (ctx: Context) => void) => void
    logger?: {
      debug: (...args: unknown[]) => void
      info: (...args: unknown[]) => void
      warn: (...args: unknown[]) => void
      error: (...args: unknown[]) => void
    }
    [key: string]: unknown
  }
}

declare module '@deepseek-ai/dsh-host-webserver' {
  export interface WebServerRoute {
    kind: string
    path: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (req: any, res: any) => void
  }
  export interface WebServerContext {
    webServer: {
      register: (route: WebServerRoute) => () => void
    }
    effect: (dispose: () => void, tag?: string) => void
    [key: string]: unknown
  }
}

declare module '@deepseek-ai/dsh-client-ui-sidebar-right/client' {
  export interface SidebarRightTabGuide {
    id: string
    order?: number
    title: () => string
    description?: () => string
    icon?: (props: { size?: number; className?: string }) => React.JSX.Element
  }
  export interface SidebarRightTabDefinition {
    id: string
    kind: string
    title: () => string
    guide?: SidebarRightTabGuide[]
  }
}

// Type-only: activates the conversation.composer.dock SlotMap merge.
declare module '@deepseek-ai/dsh-client-ui-chat/client' {
  export {}
}

// Type-only: renderer client module (activated by the real harness).
declare module '@deepseek-ai/dsh-client-ui-renderer/client' {
  export {}
}
