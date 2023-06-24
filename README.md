# iconsax for Astro framework

992 icons in 6 different styles | 24px grid-based

[![npm version](https://badge.fury.io/js/iconsax-astro.svg)](https://badge.fury.io/js/iconsax-astro)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```bash
npm i iconsax-astro
# or
yarn add iconsax-astro
```

## Usage

All the icons are available as components, from single import.

```astro
---
import { Aave, Activity, AlignVertically } from 'iconsax-astro';
---

<Aave type="outline" />
<Activity type="linear" />
<AlignVertically type="bold" size="50" fill="#101010" />
```

```Astro
---
import AaveIcon from 'iconsax-astro/Aave'
import ActivityIcon from 'iconsax-astro/Activity'
import AlignVerticallyIcon from 'iconsax-astro/AlignVertically'
---
<AaveIcon type="outline" />
<ActivityIcon type="linear" />
<AlignVerticallyIcon type="bold" size="50" fill="#101010" />
```

Each icon has a default size of `24px`, a default color of `#000000` and default type `bold`.

The following `Props` interface is available to every icon:

```ts
export interface Props {
  fill?: string;
  'fill-opacity'?: number | string;
  'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit';
  height?: number | string;
  size?: number | string;
  stroke?: string;
  'stroke-dasharray'?: string | number;
  'stroke-dashoffset'?: string | number;
  'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit';
  'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit';
  'stroke-miterlimit'?: number | string;
  'stroke-opacity'?: number | string;
  'stroke-width'?: number | string;
  viewBox?: string;
  width?: number | string;
  type?: 'bold' | 'broken' | 'bulk' | 'linear' | 'outline' | 'twotone';
}
```

- The `Props` interface additionally includes:
  - All HTML global attributes.
  - All WAI-ARIA attributes and the WAI-ARIA role attribute.
- The `title` attribute transforms into a `<title>` element within the `<svg>`.
- The `size` attribute transforms values like `1.5x` into `1.5em`.
- The `size` attribute is used as the default values for `width` and `height`.

## Available icons

Website showcasing every icon and its types will be avaialble soon.

## Acknowledgements

This package is maintained by [matt-pasek](https://github.com/matt-pasek) and based on
[@astropub/icons](https://github.com/astro-community/icons).
