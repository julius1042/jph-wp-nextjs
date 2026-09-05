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
  blocks: GutenbergBlockType[];
};

/**
 * Recursively rebuild Gutenberg HTML.
 */
function renderBlockHTML(block: GutenbergBlockType): string {
  // Simple Gutenberg block
  if (!block.innerBlocks || block.innerBlocks.length === 0) {
    return block.innerHTML || '';
  }

  let innerBlockIndex = 0;

  return (
    block.innerContent
      ?.map((content) => {
        // Normal HTML
        if (content !== null) {
          return content;
        }

        // Null = insert the next nested Gutenberg block
        const innerBlock = block.innerBlocks?.[innerBlockIndex];

        innerBlockIndex++;

        if (!innerBlock) {
          return '';
        }

        // Recursively render nested blocks
        return renderBlockHTML(innerBlock);
      })
      .join('') || ''
  );
}

export default function GutenbergBlocks({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, index) => {
        const html = renderBlockHTML(block);

        // Don't render completely empty blocks
        if (!html.trim()) {
          return null;
        }

        return (
          <AnimateOnScroll
            key={`${block.blockName}-${index}`}
            animation="animate__fadeInUp"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </AnimateOnScroll>
        );
      })}
    </>
  );
}