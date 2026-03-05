"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * NO-OP Resizable components
 * Your installed package doesn't export PanelGroup/PanelResizeHandle, so we provide
 * compatible components that compile and render normally (non-resizable).
 */

export function ResizablePanelGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function ResizablePanel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function ResizableHandle({
  className,
  withHandle,
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-px bg-border", className)}
      {...props}
    >
      {withHandle ? (
        <div className="mx-auto my-2 h-4 w-3 rounded-sm border border-border bg-background" />
      ) : null}
    </div>
  );
}
