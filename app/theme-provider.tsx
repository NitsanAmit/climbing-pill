'use client'

import { useState } from 'react';
import {
  FluentProvider,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
} from '@fluentui/react-components';
import { BrandVariants, createLightTheme, Theme } from '@fluentui/tokens';
import { Titillium_Web } from 'next/font/google';
import { useServerInsertedHTML } from 'next/navigation';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap'
})

const themePalette: BrandVariants = {
  10: '#060201',
  20: '#25110E',
  30: '#3F1917',
  40: '#551E1E',
  50: '#6C2325',
  60: '#84272D',
  70: '#B62E3F',
  80: '#db3553',
  90: '#db3553',
  100: '#e04a65',
  110: '#E95C6B',
  120: '#F0737F',
  130: '#ea7f93',
  140: '#f4bdc7',
  150: '#f9dbe1',
  160: '#fef6f7'
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
          fontFamilyBase: titilliumWeb.style.fontFamily,
          fontFamilyMonospace: titilliumWeb.style.fontFamily,
          palette: themePalette,

        }}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
};

