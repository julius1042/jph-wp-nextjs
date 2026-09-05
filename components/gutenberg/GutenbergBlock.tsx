'use client';

import AnimateOnScroll from '@/components/animations/AnimateOnScroll';

export type GutenbergBlockType = {
  blockName: string | null;
  attrs?: Record<string, unknown>;
  innerHTML?: string;
  innerBlocks?: GutenbergBlockType[];
  innerContent?: (string | null)[];
};

type Props = {
  block: GutenbergBlockType;
};

export default function GutenbergBlock({ block }: Props) {
  return (
    <AnimateOnScroll animation="animate__fadeInUp">
      <BlockContent block={block} />
    </AnimateOnScroll>
  );
}

function BlockContent({ block }: Props) {
  // Simple block without nested blocks
  if (!block.innerBlocks || block.innerBlocks.length === 0) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: block.innerHTML || '',
        }}
      />
    );
  }

  // Temporary container for nested blocks
  return (
    <div className="gutenberg-block">
      {block.innerBlocks.map((innerBlock, index) => (
        <GutenbergBlock
          key={`${innerBlock.blockName}-${index}`}
          block={innerBlock}
        />
      ))}
    </div>
  );
}