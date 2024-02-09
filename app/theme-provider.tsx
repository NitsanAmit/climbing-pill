'use client';

import { useState } from 'react';
import {
  FluentProvider,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
} from '@fluentui/react-components';
import { BrandVariants, createLightTheme, Theme } from '@fluentui/tokens';
import { Rubik } from 'next/font/google';
import { useServerInsertedHTML } from 'next/navigation';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap',
});

const themePalette: BrandVariants = {
  10: "#060203",
  20: "#241119",
  30: "#401729",
  40: "#561B37",
  50: "#6D1E44",
  60: "#852053",
  70: "#D21F80",
  80: "#ED1C91",
  90: "#ED1C91",
  100: "#ED1C91",
  110: "#F3499D",
  120: "#F768A9",
  130: "#FB82B6",
  140: "#FE9AC3",
  150: "#FFB1D0",
  160: "#FFC8DD",
};

const lightTheme: Theme = {
  ...createLightTheme(themePalette),
};


export default function ThemeProvider({ children }) {
  const [renderer] = useState(() => createDOMRenderer());

  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={{
          ...lightTheme,
          fontFamilyBase: rubik.style.fontFamily,
          fontFamilyMonospace: rubik.style.fontFamily,
          palette: themePalette,

        }}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
};

