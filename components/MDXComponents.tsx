import { ComponentProps, ElementType } from "react";

function H({ as: Tag, id, children, ...props }: { as: ElementType } & ComponentProps<"h1">) {
  return (
    <Tag id={id} {...props} className="group scroll-mt-20">
      <a href={`#${id}`} className="no-underline text-inherit">
        {children}
      </a>
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 ml-2 text-sm text-black/60 dark:text-white/60"
      >
        ¶
      </a>
    </Tag>
  );
}

export type MDXComponent = React.ComponentType<Record<string, unknown> & { children?: React.ReactNode }>;

export const mdxComponents: Record<string, MDXComponent> = {
  h1: (p: ComponentProps<"h1">) => <H as="h1" {...p} />,
  h2: (p: ComponentProps<"h2">) => <H as="h2" {...p} />,
  h3: (p: ComponentProps<"h3">) => <H as="h3" {...p} />,
  pre: (p: ComponentProps<"pre">) => (
    <pre
      {...p}
      className="rounded-xl bg-zinc-950/95 text-zinc-100 p-4 overflow-x-auto border border-white/10"
    />
  ),
  code: (p: ComponentProps<"code">) => <code {...p} className="font-mono text-sm" />,
  Callout: ({ children }: { children?: React.ReactNode }) => (
    <div className="rounded-xl border border-amber-300/30 bg-amber-50 dark:bg-amber-900/20 p-4 text-amber-900 dark:text-amber-100">
      {children}
    </div>
  ),
};
